/**
 * Main entry point.
 */
import { CLIBase } from "unitejs-cli-core/dist/cliBase";
import { CommandLineParser } from "unitejs-cli-core/dist/commandLineParser";
import { IFileSystem } from "unitejs-framework/dist/interfaces/IFileSystem";
import { ILogger } from "unitejs-framework/dist/interfaces/ILogger";
import { ICNS } from "unitejs-image/dist/icns";
import { ICO } from "unitejs-image/dist/ico";
import { SVG } from "unitejs-image/dist/svg";
import { CommandLineArgConstants } from "./commandLineArgConstants";
import { CommandLineCommandConstants } from "./commandLineCommandConstants";

export class CLI extends CLIBase {
    private static APP_NAME: string = "UniteJS Image";

    constructor() {
        super(CLI.APP_NAME);
    }

    public async handleCustomCommand(logger: ILogger, fileSystem: IFileSystem, commandLineParser: CommandLineParser): Promise<number> {
        let ret: number = -1;

        const command = commandLineParser.getCommand();

        switch (command) {
            case CommandLineCommandConstants.SVG_TO_PNG: {
                logger.info("command", { command });

                const sourceFile = commandLineParser.getStringArgument(CommandLineArgConstants.SOURCE_FILE);
                const destFile = commandLineParser.getStringArgument(CommandLineArgConstants.DEST_FILE);
                const width = commandLineParser.getNumberArgument(CommandLineArgConstants.WIDTH);
                const height = commandLineParser.getNumberArgument(CommandLineArgConstants.HEIGHT);
                const marginX = commandLineParser.getNumberArgument(CommandLineArgConstants.MARGIN_X);
                const marginY = commandLineParser.getNumberArgument(CommandLineArgConstants.MARGIN_Y);
                const background = commandLineParser.getStringArgument(CommandLineArgConstants.BACKGROUND);

                const svg = new SVG();
                ret = await svg.toPng(logger,
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
                logger.info("command", { command });

                const sourceFile = commandLineParser.getStringArgument(CommandLineArgConstants.SOURCE_FILE);
                const destFile = commandLineParser.getStringArgument(CommandLineArgConstants.DEST_FILE);

                const svg = new SVG();
                ret = await svg.toMask(logger,
                                       fileSystem,
                                       fileSystem.pathGetDirectory(sourceFile),
                                       fileSystem.pathGetFilename(sourceFile),
                                       fileSystem.pathGetDirectory(destFile),
                                       fileSystem.pathGetFilename(destFile));
                break;
            }

            case CommandLineCommandConstants.PNGS_TO_ICO: {
                logger.info("command", { command });

                const sourceFolder = commandLineParser.getStringArgument(CommandLineArgConstants.SOURCE_FOLDER);
                const sourceFiles = commandLineParser.getStringArgument(CommandLineArgConstants.SOURCE_FILES);
                const destFile = commandLineParser.getStringArgument(CommandLineArgConstants.DEST_FILE);

                const ico = new ICO();
                ret = await ico.fromPngs(logger,
                                         fileSystem,
                                         sourceFolder,
                                         sourceFiles ? sourceFiles.split(",") : [],
                                         fileSystem.pathGetDirectory(destFile),
                                         fileSystem.pathGetFilename(destFile));
                break;
            }

            case CommandLineCommandConstants.PNG_TO_ICNS: {
                logger.info("command", { command });

                const sourceFile = commandLineParser.getStringArgument(CommandLineArgConstants.SOURCE_FILE);
                const destFile = commandLineParser.getStringArgument(CommandLineArgConstants.DEST_FILE);

                const icns = new ICNS();
                ret = await icns.fromPng(logger,
                                         fileSystem,
                                         fileSystem.pathGetDirectory(sourceFile),
                                         fileSystem.pathGetFilename(sourceFile),
                                         fileSystem.pathGetDirectory(destFile),
                                         fileSystem.pathGetFilename(destFile));
            }
        }

        return ret;
    }

    public displayHelp(logger: ILogger): number {
        logger.banner("Commands");
        logger.info("  help, version, svgToPng, svgToMask, pngsToIco");
        logger.info("");

        logger.banner("svgToPng");
        logger.info("");
        this.markdownTableToCli(logger, "| sourceFile          | 'path to svg file'                           | Source svg image to generate png                 |");
        this.markdownTableToCli(logger, "| destFile            | 'path to png file'                           | Destination image for generated png              |");
        this.markdownTableToCli(logger, "| width               | number                                       | The width in pixels to generate png              |");
        this.markdownTableToCli(logger, "| height              | number                                       | The height in pixels to generate png             |");
        this.markdownTableToCli(logger, "| marginX             | number                                       | The margin in pixels to leave at left and right  |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to 0                       |");
        this.markdownTableToCli(logger, "| marginY             | number                                       | The margin in pixels to leave at top and bottom  |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to 0                       |");
        this.markdownTableToCli(logger, "| background          | hex color                                    | The colour to fill the background                |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to transparent             |");
        logger.info("");

        logger.banner("svgToMask");
        logger.info("");
        this.markdownTableToCli(logger, "| sourceFile          | 'path to svg file'                           | Source svg image to generate svg mask            |");
        this.markdownTableToCli(logger, "| destFile            | 'path to svg mask file'                      | Destination image for generated svg mask         |");
        logger.info("");

        logger.banner("pngsToIco");
        logger.info("");
        this.markdownTableToCli(logger, "| sourceFolder        | 'folder'                                     | The folder that contains the png files           |");
        this.markdownTableToCli(logger, "| sourceFiles         | comma separated list of filenames            | The files to combine from the sourceFolder       |");
        this.markdownTableToCli(logger, "| destFile            | 'path to ico file'                           | Destination image for generated ico              |");
        logger.info("");

        logger.banner("pngToIcns");
        logger.info("");
        this.markdownTableToCli(logger, "| sourceFile          | 'path to png file'                           | Source png image to generate icns                |");
        this.markdownTableToCli(logger, "| destFile            | 'path to icns file'                          | Destination image for generated icns             |");
        logger.info("");

        logger.banner("Global Arguments");
        logger.info("");
        this.markdownTableToCli(logger, "| noColor             |                                           | If this is used no color will appear in output   |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to on                      |");
        this.markdownTableToCli(logger, "| logFile             | 'filename'                                | The log file to store the logging in             |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to no file logging         |");
        this.markdownTableToCli(logger, "");
        logger.info("");

        logger.banner("More Information");
        logger.info("");
        logger.info("  See https://github.com/unitejs/image-cli#readme for further details.");

        return 0;
    }

}
