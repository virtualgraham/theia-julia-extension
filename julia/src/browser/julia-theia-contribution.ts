import { injectable, inject } from "inversify";
import { BaseLanguageClientContribution, Workspace, Languages, LanguageClientFactory } from '@theia/languages/lib/browser';
import { JULIA_LANGUAGE_ID, JULIA_LANGUAGE_NAME } from '../common';

@injectable()
export class JuliaClientContribution extends BaseLanguageClientContribution {

    readonly id = JULIA_LANGUAGE_ID;
    readonly name = JULIA_LANGUAGE_NAME;

    constructor(
        @inject(Workspace) protected readonly workspace: Workspace,
        @inject(Languages) protected readonly languages: Languages,
        @inject(LanguageClientFactory) protected readonly languageClientFactory: LanguageClientFactory
    ) {
        super(workspace, languages, languageClientFactory);
    }

    protected get globPatterns() {
        return [
            '**/*.jl'
        ];
    }
}