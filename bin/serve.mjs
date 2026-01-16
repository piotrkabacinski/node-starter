import { swcDir } from "@swc/cli";
import { readFileSync } from "node:fs";
import { styleText } from "node:util";
import { spawn } from "node:child_process";

const swcOptions = readFileSync(".swcrc", {
  encoding: "utf8",
});

const swcOptionsParsed = JSON.parse(swcOptions);

const outDir = ".tmp";

swcDir({
  cliOptions: {
    outDir,
    copyFiles: true,
    watch: true,
    filenames: ["./src"],
    extensions: [".ts"],
    stripLeadingPaths: true,
  },
  swcOptions: {
    ...swcOptionsParsed,
    jsc: {
      ...swcOptionsParsed.jsc,
      baseUrl: `${import.meta.dirname}/../`,
    },
  },
  callbacks: {
    onSuccess: (s) => {
      if (s.filename) {
        console.log(
          styleText(
            "cyan",
            `Compiled ${s.filename} in ${s.duration.toFixed(2)}ms`,
          ),
        );
      }
    },
    onFail: (e) => {
      console.log(styleText("red", e));
    },
    onWatchReady: () => {
      console.log("Watching's ready...");

      spawn(
        "node",
        [`--watch-path=${outDir}`, "--env-file=.env", `${outDir}/index.js`],
        {
          stdio: "inherit",
        },
      );
    },
  },
});
