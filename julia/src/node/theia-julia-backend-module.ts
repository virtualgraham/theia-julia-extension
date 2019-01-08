import { ContainerModule } from "inversify";
import { LanguageServerContribution } from "@theia/languages/lib/node";
import { JuliaContribution } from './theia-julia-contribution';

export default new ContainerModule(bind => {
    bind(LanguageServerContribution).to(JuliaContribution).inSingletonScope();
});