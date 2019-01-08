/**
 * Generated using theia-extension-generator
 */

import { ContainerModule } from "inversify";
import { JuliaGrammarContribution } from './julia-grammar-contribution';
import { LanguageGrammarDefinitionContribution } from '@theia/monaco/lib/browser/textmate';
import { JuliaClientContribution } from './julia-theia-contribution';
import { LanguageClientContribution } from '@theia/languages/lib/browser';

export default new ContainerModule(bind => {    
    bind(JuliaClientContribution).toSelf().inSingletonScope();
    bind(LanguageClientContribution).toDynamicValue(ctx => ctx.container.get(JuliaClientContribution));
    
    bind(LanguageGrammarDefinitionContribution).to(JuliaGrammarContribution).inSingletonScope();
});