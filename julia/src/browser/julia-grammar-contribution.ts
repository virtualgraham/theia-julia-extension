import { injectable } from 'inversify'
import {
    LanguageGrammarDefinitionContribution, TextmateRegistry
} from '@theia/monaco/lib/browser/textmate'

@injectable()
export class JuliaGrammarContribution implements LanguageGrammarDefinitionContribution {

    readonly id = 'julia';
    readonly scopeName = 'source.julia';

    readonly config: monaco.languages.LanguageConfiguration = {
        comments: {
            lineComment: "#",
            blockComment: ["#=", "=#"]
        },
        brackets: [
            ["{", "}"],
            ["[", "]"],
            ["(", ")"]
        ],
        autoClosingPairs: [
            { open: "{", close: "}", notIn: ["string"] },
            { open: "[", close: "]", notIn: ["string"] },
            { open: "(", close: ")", notIn: ["string"] },
            { open: "'", close: "'", notIn: ["string", "comment"] },
            { open: "\"", close: "\"", notIn: ["string", "comment"] },
            { open: "`", close: "`", notIn: ["string", "comment"] },
            { open: "#=", close: "\n=#", notIn: ["string"] }
        ],
        surroundingPairs: [
            { open: "{", close: "}" },
            { open: "[", close: "]" },
            { open: "(", close: ")" },
            { open: "'", close: "'" },
            { open: "\"", close: "\"" },
            { open: "`", close: "`"}
            
        ],
        folding: {
            markers: {
                start: /^\\s*#region\\b/,
                end: /^\\s*#endregion\\b/
            }
        }
    };
    
    registerTextmateLanguage(registry: TextmateRegistry) {
        
         monaco.languages.register({
            id: this.id,
            "extensions": [
                ".jl"
            ],
            "aliases": [
                "julia"
            ],
            "mimetypes": [
                "text/julia"
            ]
        });

        monaco.languages.setLanguageConfiguration(this.id, this.config);
        
        registry.registerTextmateGrammarScope(this.scopeName, {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: require('../../data/julia.tmLanguage.json'),
                }
            }
        });
        
        registry.mapLanguageIdToTextmateGrammar(this.id, this.scopeName);
    }
}