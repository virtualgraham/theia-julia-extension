import * as os from 'os';
import * as path from 'path';
import { injectable } from "inversify";
import { IConnection, BaseLanguageServerContribution, LanguageServerStartOptions } from "@theia/languages/lib/node";
import { JULIA_LANGUAGE_ID, JULIA_LANGUAGE_NAME, JuliaStartParams } from '../common';

const { execSync } = require('child_process');


export interface JuliaStartOptions extends LanguageServerStartOptions {
    parameters?: JuliaStartParams
}

@injectable()
export class JuliaContribution extends BaseLanguageServerContribution {

    readonly id = JULIA_LANGUAGE_ID;
    readonly name = JULIA_LANGUAGE_NAME;

    start(clientConnection: IConnection, { parameters }: JuliaStartOptions): void {

        let command = getJuliaExePath(parameters && parameters.command)
        let jlEnvPath = getEnvPath(command)
        
        console.log('jlEnvPath', jlEnvPath)
        
        const language_server_path = path.resolve(__dirname, '..', '..', 'scripts', 'languageserver')
        
        console.log('language_server_path', language_server_path)
        
        let oldDepotPath = process.env.JULIA_DEPOT_PATH ? process.env.JULIA_DEPOT_PATH : "";
        
        // let oldDepotPath = "/home/virtualgraham/.julia"
        
        let g_lscrashreportingpipename = ""
    
        //let serverArgsRun = ['--startup-file=no', '--history-file=no', 'main.jl', jlEnvPath, '--debug=no', g_lscrashreportingpipename, oldDepotPath];
        
        let serverArgsRun = ['--startup-file=no', '--history-file=no', 'main.jl', jlEnvPath, '--debug=yes', g_lscrashreportingpipename, oldDepotPath];
        
        let spawnOptions = {
            cwd: language_server_path,
            env: {
                JULIA_DEPOT_PATH: path.join(language_server_path, 'julia_pkgdir'),
                HOME: process.env.HOME ? process.env.HOME : os.homedir()
            }
        };

        console.log('command', command)
        console.log('serverArgsRun', serverArgsRun)
        console.log('spawnOptions', spawnOptions)

        const serverConnection = this.createProcessStreamConnection(command, serverArgsRun, spawnOptions);
        // serverConnection.reader.onError(err => console.log(err));
        this.forward(clientConnection, serverConnection);
    }

    protected onDidFailSpawnProcess(error: Error): void {
        super.onDidFailSpawnProcess(error);
        console.error("Error starting julia language server.");
        console.error("Please make sure it is installed on your system.");
    }
}

// getJuliaExePath and getEnvPath are syncronous versions of the same methods in julia-vscode

function getJuliaExePath(executable:string | undefined):string {
    if (executable == null) {
        
            let homedir = os.homedir();
            let pathsToSearch = [];
            if (process.platform == "win32") {
                pathsToSearch = ["julia.exe",
                    path.join(homedir, "AppData", "Local", "Julia-1.1.0", "bin", "julia.exe"),
                    path.join(homedir, "AppData", "Local", "Julia-1.0.4", "bin", "julia.exe"),
                    path.join(homedir, "AppData", "Local", "Julia-1.0.3", "bin", "julia.exe"),
                    path.join(homedir, "AppData", "Local", "Julia-1.0.2", "bin", "julia.exe"),
                    path.join(homedir, "AppData", "Local", "Julia-1.0.1", "bin", "julia.exe"),
                    path.join(homedir, "AppData", "Local", "Julia-1.0.0", "bin", "julia.exe")                    
                ];
            }
            else if (process.platform == "darwin") {
                pathsToSearch = ["julia",
                    path.join(homedir, "Applications", "Julia-1.1.app", "Contents", "Resources", "julia", "bin", "julia"),
                    path.join("/", "Applications", "Julia-1.1.app", "Contents", "Resources", "julia", "bin", "julia"),
                    path.join(homedir, "Applications", "Julia-1.0.app", "Contents", "Resources", "julia", "bin", "julia"),
                    path.join("/", "Applications", "Julia-1.0.app", "Contents", "Resources", "julia", "bin", "julia")];
            }
            else {
                pathsToSearch = ["julia"];
            }
      
            for (let p of pathsToSearch) {
                try {
                    
                    var res = execSync(`"${p}" --startup-file=no --history-file=no -e "println(Sys.BINDIR)"`);
                    console.log("pathsToSearch res", p, res)
                    if (p == 'julia' || p == "julia.exe") {
                        // use full path
                        executable = path.join(res.toString().trim(), p);
                    } else {
                        executable = p;
                    }
                    break;
                }
                catch (e) {
                    console.log("pathsToSearch e", p, e)
                }
            }
    }
    return executable || "julia"
}

function getEnvPath(command:string) {
    var res = execSync(`"${command}" --startup-file=no --history-file=no -e "using Pkg; println(dirname(Pkg.Types.Context().env.project_file))"`);
    return res.toString().trim();
}