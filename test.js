import { transformSync } from "@swc/core";
import FormatJSTransformer from "@formatjs/swc-plugin";

const out = transformSync(
  `
  import { FormattedMessage } from "react-intl";

  export const Foo = () => (
    <div>
      <FormattedMessage defaultMessage="foo" description="bar" />
    </div>
  );`,
  {
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: true,
      },
      target: "es2018",
    },
    plugin: (m) => {
      return new FormatJSTransformer.FormatJSTransformer({
        overrideIdFn: "[sha512:contenthash:base64:6]",
        ast: true,
        removeDefaultMessage: false,
      }).visitProgram(m);
    },
  }
);

console.log(out);
