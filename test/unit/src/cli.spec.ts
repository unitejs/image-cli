/**
 * Tests for CLI.
 */
import * as Chai from "chai";
import * as Sinon from "sinon";
import { CommandLineParser } from "unitejs-cli-core/dist/commandLineParser";
import { FileSystem } from "unitejs-cli-core/dist/fileSystem";
import { IFileSystem } from "unitejs-framework/dist/interfaces/IFileSystem";
import { ILogger } from "unitejs-framework/dist/interfaces/ILogger";
import { DefaultLogger } from "unitejs-framework/dist/loggers/defaultLogger";
import { CLI } from "../../../src/cli";

describe("CLI", () => {
    let sandbox: Sinon.SinonSandbox;
    let loggerStub: ILogger;
    let fileSystemStub: IFileSystem;
    let defaultLoggerStub: Sinon.SinonStub;
    let commandLineParser: CommandLineParser;
    let loggerInfoSpy: Sinon.SinonSpy;

    beforeEach(() => {
        sandbox = Sinon.sandbox.create();
        loggerStub = <ILogger>{};
        loggerStub.banner = () => { };
        loggerStub.info = () => { };
        loggerStub.warning = () => { };
        loggerStub.error = () => { };

        fileSystemStub = new FileSystem();

        defaultLoggerStub = sandbox.stub(DefaultLogger, "log");

        loggerInfoSpy = sandbox.spy(loggerStub, "info");

        commandLineParser = new CommandLineParser();
    });

    afterEach(async () => {
        sandbox.restore();
        await fileSystemStub.directoryDelete("./test/unit/temp");
    });

    it("can be created", () => {
        const obj = new CLI();
        Chai.should().exist(obj);
    });

    describe("handleCustomCommand", () => {
        it("can fail with unknown command", async () => {
            const obj = new CLI();
            commandLineParser.parse(["unknown"]);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(-1);
        });

        it("can handle svgToPng", async () => {
            const obj = new CLI();
            commandLineParser.parse(["node", "./bin/unite-image.js", "svgToPng",
                "--sourceFile=./test/unit/assets/test.svg",
                "--destFile=./test/unit/temp/test1024.png",
                "--width=100",
                "--height=100"
            ]);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(0);
            const fileExists = await fileSystemStub.fileExists("./test/unit/temp/", "test1024.png");
            Chai.expect(fileExists).to.be.equal(true);
        });

        it("can fail svgToPng with unknown args", async () => {
            const obj = new CLI();
            commandLineParser.parse(["node", "./bin/unite-image.js", "svgToPng",
                "--sourceFile=./test/unit/assets/test.svg",
                "--destFile=./test/unit/temp/test1024.png",
                "--width=100",
                "--height=100",
                "--colour=#FFF"
            ]);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        });

        it("can handle svgToMask", async () => {
            const obj = new CLI();
            commandLineParser.parse(["node", "./bin/unite-image.js", "svgToMask",
                "--sourceFile=./test/unit/assets/test.svg",
                "--destFile=./test/unit/temp/mask.svg"
            ]);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(0);
            const fileExists = await fileSystemStub.fileExists("./test/unit/temp/", "mask.svg");
            Chai.expect(fileExists).to.be.equal(true);
        });

        it("can fail svgToMask with unknown args", async () => {
            const obj = new CLI();
            commandLineParser.parse(["node", "./bin/unite-image.js", "svgToMask",
                "--sourceFile=./test/unit/assets/test.svg",
                "--destFile=./test/unit/temp/mask.svg",
                "---width=100"
            ]);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        });

        it("can handle pngsToIco", async () => {
            const obj = new CLI();
            commandLineParser.parse(["node", "./bin/unite-image.js", "pngsToIco",
                "--sourceFolder=./test/unit/assets/",
                "--sourceFiles=favicon-16x16.png,favicon-32x32.png",
                "--destFile=./test/unit/temp/favicon.ico"
            ]);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(0);
            const fileExists = await fileSystemStub.fileExists("./test/unit/temp/", "favicon.ico");
            Chai.expect(fileExists).to.be.equal(true);
        });

        it("can handle pngsToIco with empty sourceFiles", async () => {
            const obj = new CLI();
            commandLineParser.parse(["node", "./bin/unite-image.js", "pngsToIco",
                "--sourceFolder=./test/unit/assets/",
                "--sourceFiles=",
                "--destFile=./test/unit/temp/favicon.ico"
            ]);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        });

        it("can fail pngsToIco with unknown args", async () => {
            const obj = new CLI();
            commandLineParser.parse(["node", "./bin/unite-image.js", "pngsToIco",
                "--sourceFolder=./test/unit/assets/",
                "--sourceFiles=favicon-16x16.png,favicon-32x32.png",
                "--destFile=./test/unit/temp/favicon.ico",
                "--width=100"
            ]);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        });

        it("can handle pngToIcns", async () => {
            const obj = new CLI();
            commandLineParser.parse(["node", "./bin/unite-image.js", "pngToIcns",
                "--sourceFile=./test/unit/assets/test1024.png",
                "--destFile=./test/unit/temp/apple.icns"
            ]);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(0);
            const fileExists = await fileSystemStub.fileExists("./test/unit/temp/", "apple.icns");
            Chai.expect(fileExists).to.be.equal(true);
        });

        it("can fail pngToIcns with unknown args", async () => {
            const obj = new CLI();
            commandLineParser.parse(["node", "./bin/unite-image.js", "pngToIcns",
                "--sourceFile=./test/unit/assets/test1024.png",
                "--destFile=./test/unit/temp/apple.icns",
                "--width=100"
            ]);
            const res = await obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        });
    });

    describe("displayHelp", () => {
        it("can display help", async () => {
            const obj = new CLI();
            const res = obj.displayHelp(loggerStub);
            Chai.expect(res).to.be.equal(0);
            Chai.expect(loggerInfoSpy.called).to.be.equal(true);
        });
    });
});
