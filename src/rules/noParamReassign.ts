/**
 * @license
 * Copyright 2014 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as ts from "typescript";

import * as Lint from "../lint";

export class Rule extends Lint.Rules.AbstractRule {
    /* tslint:disable:object-literal-sort-keys */
    public static metadata: Lint.IRuleMetadata = {
        ruleName: "no-param-reassign",
        description: "Disallows reassignment and certain manipulation of function parameters.",
        descriptionDetails: Lint.Utils.dedent`
            Disallows reassignment and certain modifications of function parameters. The following
            modifications are prevented:
                - \`parameter.property = "newValue"\`
                - \`++parameter.property\` etc
                - \`delete parameter.property\`
            You can still call methods on parameter properties:
                - \`parameter.property()\``,
        rationale: Lint.Utils.dedent`
            Accidental manipulation of a referential function parameter could have unintended
            consequences for calling code.

            Additionally multiple assignments to a single parameter create confusion for
            maintainers who could reasonably expect that accessing the parameter results in the
            value passed into the function. This problem worsens if the parameter and its contents
            are documented initially before reassignment or manipulation.`,
        optionsDescription: "Not configurable.",
        options: null,
        optionExamples: ["true"],
        type: "maintainability",
    };
    /* tslint:enable:object-literal-sort-keys */

    public static ASSIGNMENT_FAILURE_STRING = "Assignment to function parameter.";
    public static MODIFICATION_FAILURE_STRING = "do not use 'new' for side effects";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoParamReassignWalker(sourceFile, this.getOptions()));
    }
}

class NoParamReassignWalker extends Lint.RuleWalker {
    public visitNode(node: ts.Node) {
        super.visitNode(node);
    }
}
