"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Main entry point.
 */
const cliBase_1 = require("unitejs-cli-core/dist/cliBase");
const ico_1 = require("unitejs-image/dist/ico");
const svg_1 = require("unitejs-image/dist/svg");
const commandLineArgConstants_1 = require("./commandLineArgConstants");
const commandLineCommandConstants_1 = require("./commandLineCommandConstants");
class CLI extends cliBase_1.CLIBase {
    constructor() {
        super(CLI.APP_NAME);
    }
    handleCustomCommand(logger, fileSystem, commandLineParser) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = -1;
            const command = commandLineParser.getCommand();
            switch (command) {
                case commandLineCommandConstants_1.CommandLineCommandConstants.SVG_TO_PNG: {
                    logger.info("command", { command });
                    const sourceFile = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_FILE);
                    const destFile = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.DEST_FILE);
                    const width = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.WIDTH);
                    const height = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.HEIGHT);
                    const marginX = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.MARGIN_X);
                    const marginY = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.MARGIN_Y);
                    const background = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.BACKGROUND);
                    const svg = new svg_1.SVG();
                    ret = yield svg.toPng(logger, fileSystem, fileSystem.pathGetDirectory(sourceFile), fileSystem.pathGetFilename(sourceFile), fileSystem.pathGetDirectory(destFile), fileSystem.pathGetFilename(destFile), width, height, marginX, marginY, background);
                    break;
                }
                case commandLineCommandConstants_1.CommandLineCommandConstants.SVG_TO_MASK: {
                    logger.info("command", { command });
                    const sourceFile = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_FILE);
                    const destFile = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.DEST_FILE);
                    const svg = new svg_1.SVG();
                    ret = yield svg.toMask(logger, fileSystem, fileSystem.pathGetDirectory(sourceFile), fileSystem.pathGetFilename(sourceFile), fileSystem.pathGetDirectory(destFile), fileSystem.pathGetFilename(destFile));
                    break;
                }
                case commandLineCommandConstants_1.CommandLineCommandConstants.PNGS_TO_ICO: {
                    logger.info("command", { command });
                    const sourceFolder = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_FOLDER);
                    const sourceFiles = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_FILES);
                    const destFile = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.DEST_FILE);
                    const ico = new ico_1.ICO();
                    ret = yield ico.fromPngs(logger, fileSystem, sourceFolder, sourceFiles ? sourceFiles.split(",") : [], fileSystem.pathGetDirectory(destFile), fileSystem.pathGetFilename(destFile));
                }
            }
            return ret;
        });
    }
    displayHelp(logger) {
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
CLI.APP_NAME = "UniteJS Image";
exports.CLI = CLI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91bml0ZWpzLWltYWdlLWNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSCwyREFBd0Q7QUFJeEQsZ0RBQTZDO0FBQzdDLGdEQUE2QztBQUM3Qyx1RUFBb0U7QUFDcEUsK0VBQTRFO0FBRTVFLFNBQWlCLFNBQVEsaUJBQU87SUFHNUI7UUFDSSxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFWSxtQkFBbUIsQ0FBQyxNQUFlLEVBQUUsVUFBdUIsRUFBRSxpQkFBb0M7O1lBQzNHLElBQUksR0FBRyxHQUFXLENBQUMsQ0FBQyxDQUFDO1lBRXJCLE1BQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRS9DLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsS0FBSyx5REFBMkIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUVwQyxNQUFNLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsaURBQXVCLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3RGLE1BQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxpREFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDbEYsTUFBTSxLQUFLLEdBQUcsaUJBQWlCLENBQUMsV0FBVyxDQUFDLGlEQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMzRSxNQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsaURBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzdFLE1BQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxpREFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDaEYsTUFBTSxPQUFPLEdBQUcsaUJBQWlC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
