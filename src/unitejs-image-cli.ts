/**
 * Main entry point.
 */
import { CLIBase } from "unitejs-cli-core/dist/cliBase";
import { CommandLineParser } from "unitejs-cli-core/dist/commandLineParser";
import { IDisplay } from "unitejs-framework/dist/interfaces/IDisplay";
import { IFileSystem } from "unitejs-framework/dist/interfaces/IFileSystem";
import { ILogger } from "unitejs-framework/dist/interfaces/ILogger";
import { CommandLineArgConstants } from "./commandLineArgConstants";
import { CommandLineCommandConstants } from "./commandLineCommandConstants";

export class CLI extends CLIBase {
    private static APP_NAME: string = "UniteJS Image";
    private static DEFAULT_LOG: string = "unite-image.log";

    constructor() {
        super(CLI.APP_NAME, CLI.DEFAULT_LOG);
    }

    public async handleCustomCommand(logger: ILogger, display: IDisplay, fileSystem: IFileSystem, commandLineParser: CommandLineParser): Promise<number> {
        let ret: number = -1;

        const command = commandLineParser.getCommand();

        switch (command) {
            case CommandLineCommandConstants.SOME_COMMAND: {
                display.info(`command: ${command}`);
                const aParam = commandLineParser.getArgument(CommandLineArgConstants.A_PARAM);
                display.info("aParam", [ aParam ]);
                ret = 0;
            }
        }

        return ret;
    }

    public displayHelp(display: IDisplay): number {
        display.diagnostics("Commands");
        display.info("  help, version, someCommand");
        display.info("");

        display.diagnostics("someCommand");
        display.info("");
        this.markdownTableToCli(display, "| aParam              | plain text                                   | A parameter for something                        |");
        display.info("");

        display.diagnostics("More Information");
        display.info("");
        display.info("  See https://github.com/unitejs/image-cli#readme for further details.");

        return 0;
    }
}
