/**
 * Main entry point.
 */
import { CLIBase } from "unitejs-cli-core/dist/cliBase";
import { CommandLineParser } from "unitejs-cli-core/dist/commandLineParser";
import { IDisplay } from "unitejs-framework/dist/interfaces/IDisplay";
import { IFileSystem } from "unitejs-framework/dist/interfaces/IFileSystem";
import { ILogger } from "unitejs-framework/dist/interfaces/ILogger";
import { ICO } from "unitejs-image/dist/ico";
import { SVG } from "unitejs-image/dist/svg";
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
            case CommandLineCommandConstants.SVG_TO_PNG: {
                display.info(`command: ${command}`);

                const sourceFile = commandLineParser.getArgument(CommandLineArgConstants.SOURCE_FILE);
                const destFile = commandLineParser.getArgument(CommandLineArgConstants.DEST_FILE);
                const width = commandLineParser.getArgument(CommandLineArgConstants.WIDTH);
                const height = commandLineParser.getArgument(CommandLineArgConstants.HEIGHT);
                const marginX = commandLineParser.getArgument(CommandLineArgConstants.MARGIN_X);
                const marginY = commandLineParser.getArgument(CommandLineArgConstants.MARGIN_Y);
                const background = commandLineParser.getArgument(CommandLineArgConstants.BACKGROUND);

                const svg = new SVG();
                ret = await svg.toPng(display,
                                      fileSystem,
                                      fileSystem.pathGetDirectory(sourceFile),
                                      fileSystem.pathGetFilename(sourceFile),
                                      fileSystem.pathGetDirectory(destFile),
                                      fileSystem.pathGetFilename(destFile),
                                      width,
                                      height,
                                      marginX,
                                      marginY,
                                      background);
                break;
            }

            case CommandLineCommandConstants.SVG_TO_MASK: {
                display.info(`command: ${command}`);

                const sourceFile = commandLineParser.getArgument(CommandLineArgConstants.SOURCE_FILE);
                const destFile = commandLineParser.getArgument(CommandLineArgConstants.DEST_FILE);

                const svg = new SVG();
                ret = await svg.toMask(display,
                                       fileSystem,
                                       fileSystem.pathGetDirectory(sourceFile),
                                       fileSystem.pathGetFilename(sourceFile),
                                       fileSystem.pathGetDirectory(destFile),
                                       fileSystem.pathGetFilename(destFile));
                break;
            }

            case CommandLineCommandConstants.PNGS_TO_ICO: {
                display.info(`command: ${command}`);

                const sourceFolder = commandLineParser.getArgument(CommandLineArgConstants.SOURCE_FOLDER);
                const sourceFiles = commandLineParser.getArgument(CommandLineArgConstants.SOURCE_FILES);
                const destFile = commandLineParser.getArgument(CommandLineArgConstants.DEST_FILE);

                const ico = new ICO();
                ret = await ico.fromPngs(display,
                                         fileSystem,
                                         sourceFolder,
                                         sourceFiles ? sourceFiles.split(",") : [],
                                         fileSystem.pathGetDirectory(destFile),
                                         fileSystem.pathGetFilename(destFile));
            }
        }

        return ret;
    }

    public displayHelp(display: IDisplay): number {
        display.diagnostics("Commands");
        display.info("  help, version, svgToPng, svgToMask, pngsToIco");
        display.info("");

        display.diagnostics("svgToPng");
        display.info("");
        this.markdownTableToCli(display, "| sourceFile          | 'path to svg file'                           | Source svg image to generate png                 |");
        this.markdownTableToCli(display, "| destFile            | 'path to png file'                           | Destination image for generated png              |");
        this.markdownTableToCli(display, "| width               | number                                       | The width in pixels to generate png              |");
        this.markdownTableToCli(display, "| height              | number                                       | The height in pixels to generate png             |");
        this.markdownTableToCli(display, "| marginX             | number                                       | The margin in pixels to leave at left and right  |");
        this.markdownTableToCli(display, "|                     |                                              |   optional - defaults to 0                       |");
        this.markdownTableToCli(display, "| marginY             | number                                       | The margin in pixels to leave at top and bottom  |");
        this.markdownTableToCli(display, "|                     |                                              |   optional - defaults to 0                       |");
        this.markdownTableToCli(display, "| background          | hex color                                    | The colour to fill the background                |");
        this.markdownTableToCli(display, "|                     |                                              |   optional - defaults to transparent             |");
        display.info("");

        display.diagnostics("svgToMask");
        display.info("");
        this.markdownTableToCli(display, "| sourceFile          | 'path to svg file'                           | Source svg image to generate svg mask            |");
        this.markdownTableToCli(display, "| destFile            | 'path to svg mask file'                      | Destination image for generated svg mask         |");
        display.info("");

        display.diagnostics("pngsToIco");
        display.info("");
        this.markdownTableToCli(display, "| sourceFolder        | 'folder'                                     | The folder that contains the png files           |");
        this.markdownTableToCli(display, "| sourceFiles         | comma separated list of filenames            | The files to combine from the sourceFolder       |");
        this.markdownTableToCli(display, "| destFile            | 'path to ico file'                           | Destination image for generated ico              |");
        display.info("");

        display.diagnostics("More Information");
        display.info("");
        display.info("  See https://github.com/unitejs/image-cli#readme for further details.");

        return 0;
    }

}
