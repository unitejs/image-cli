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
                const margin = commandLineParser.getArgument(CommandLineArgConstants.MARGIN);
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
                                      margin,
                                      background);
                break;
            }

            case CommandLineCommandConstants.SVG_TO_MASK: {
                display.info(`command: ${command}`);

                const sourceFile = commandLineParser.getArgument(CommandLineArgConstants.SOURCE_FILE);
                const destFile = commandLineParser.getArgument(CommandLineArgConstants.DEST_FILE);
                const mask = commandLineParser.getArgument(CommandLineArgConstants.MASK);

                const svg = new SVG();
                ret = await svg.toMask(display,
                                       fileSystem,
                                       fileSystem.pathGetDirectory(sourceFile),
                                       fileSystem.pathGetFilename(sourceFile),
                                       fileSystem.pathGetDirectory(destFile),
                                       fileSystem.pathGetFilename(destFile),
                                       mask);
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

/* node ./bin/unite-image svgToPng --sourceFile=d:\unite\favicon\logo-transparent.svg --destFile=d:\unite\favicon\favicons2\android-chrome-192x192.png --width=192 --height=192 --margin=10 --background=#339933
node ./bin/unite-image svgToPng --sourceFile=d:\unite\favicon\logo-transparent.svg --destFile=d:\unite\favicon\favicons2\android-chrome-512x512.png --width=512 --height=512 --margin=10 --background=#339933
node ./bin/unite-image svgToPng --sourceFile=d:\unite\favicon\logo-transparent.svg --destFile=d:\unite\favicon\favicons2\apple-touch-icon.png --width=180 --height=180 --margin=10 --background=#339933

node ./bin/unite-image svgToPng --sourceFile=d:\unite\favicon\logo-transparent.svg --destFile=d:\unite\favicon\favicons2\mstile-70x70.png --width=128 --height=128 --margin=10
node ./bin/unite-image svgToPng --sourceFile=d:\unite\favicon\logo-transparent.svg --destFile=d:\unite\favicon\favicons2\mstile-144x144.png --width=144 --height=144 --margin=0
node ./bin/unite-image svgToPng --sourceFile=d:\unite\favicon\logo-transparent.svg --destFile=d:\unite\favicon\favicons2\mstile-150x150.png --width=270 --height=270 --margin=50
node ./bin/unite-image svgToPng --sourceFile=d:\unite\favicon\logo-transparent.svg --destFile=d:\unite\favicon\favicons2\mstile-310x150.png --width=558 --height=270 --margin=50
node ./bin/unite-image svgToPng --sourceFile=d:\unite\favicon\logo-transparent.svg --destFile=d:\unite\favicon\favicons2\mstile-310x310.png --width=558 --height=558 --margin=50

node ./bin/unite-image svgToMask --sourceFile=d:\unite\favicon\logo-transparent.svg --destFile=d:\unite\favicon\favicons2\safari-pinned-tab.svg --mask=#FFFFFF

node ./bin/unite-image svgToPng --sourceFile=d:\unite\favicon\logo.svg --destFile=d:\unite\favicon\favicons2\favicon-16x16.png --width=16 --height=16
node ./bin/unite-image svgToPng --sourceFile=d:\unite\favicon\logo.svg --destFile=d:\unite\favicon\favicons2\favicon-32x32.png --width=32 --height=32
node ./bin/unite-image svgToPng --sourceFile=d:\unite\favicon\logo.svg --destFile=d:\unite\favicon\favicons2\favicon-48x48.png --width=48 --height=48

node ./bin/unite-image pngsToIco --sourceFolder=d:\unite\favicon\favicons2 --sourceFiles=favicon-16x16.png,favicon-32x32.png,favicon-48x48.png --destFile=d:\unite\favicon\favicons2\favicon.ico


await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo-transparent.svg", "D:/unite/favicon/favicons2/", "android-chrome-192x192.png", 192, 192, 10, "#339933");
await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo-transparent.svg", "D:/unite/favicon/favicons2", "/android-chrome-512x512.png", 512, 512, 10, "#339933");
await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo-transparent.svg", "D:/unite/favicon/favicons2/", "apple-touch-icon.png", 180, 180, 10, "#339933");

await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo-transparent.svg", "D:/unite/favicon/favicons2/", "mstile-70x70.png", 128, 128, 10, "");
await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo-transparent.svg", "D:/unite/favicon/favicons2/", "mstile-144x144.png", 144, 144, 0, "");
await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo-transparent.svg", "D:/unite/favicon/favicons2/", "mstile-150x150.png", 270, 270, 50, "");
await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo-transparent.svg", "D:/unite/favicon/favicons2/", "mstile-310x150.png", 558, 270, 50, "");
await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo-transparent.svg", "D:/unite/favicon/favicons2/", "mstile-310x310.png", 558, 558, 50, "");

await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo.svg", "D:/unite/favicon/favicons2/", "favicon-16x16.png", 16, 16, 0, "");
await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo.svg", "D:/unite/favicon/favicons2/", "favicon-32x32.png", 32, 32, 0, "");
await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo.svg", "D:/unite/favicon/favicons2/", "favicon-48x48.png", 48, 48, 0, "");

await this.pngToIco(display, fileSystem, ["D:/unite/favicon/favicons2/favicon-16x16.png",
    "D:/unite/favicon/favicons2/favicon-32x32.png",
    "D:/unite/favicon/favicons2/favicon-48x48.png"],
                    "D:/unite/favicon/favicons2",
                    "favicon.ico");

await fileSystem.fileDelete("D:/unite/favicon/favicons2/", "favicon-48x48.png");*/