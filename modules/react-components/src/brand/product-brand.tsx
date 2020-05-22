/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { TestableComponentInterface } from "@wso2is/core/models";
import classNames from "classnames";
import React, { FunctionComponent, PropsWithChildren, ReactElement } from "react";
import { Label, SemanticCOLORS } from "semantic-ui-react";
import { Heading } from "../typography";

/**
 * Product brand component Prop types.
 */
export interface ProductBrandPropsInterface extends TestableComponentInterface {
    /**
     * Additional CSS classes.
     */
    className?: string;
    /**
     * Product logo.
     */
    logo?: any;
    /**
     * Product name.
     */
    name: string;
    /**
     * Custom styles object.
     */
    style?: object;
    /**
     * Product version.
     */
    version?: ProductVersionInterface;
}

/**
 * Product version interface
 */
export interface ProductVersionInterface {
    /**
     * Release type.
     */
    releaseType?: "milestone" | "alpha" | "beta" | "rc" | string;
    /**
     * Product version number.
     */
    versionNumber?: string;
    /**
     * Milestone version number.
     */
    milestoneNumber?: string;
    /**
     * Color for the release label.
     */
    labelColor?: SemanticCOLORS;
    /**
     * Text case.
     */
    textCase?: "lowercase" | "uppercase";
}

/**
 * Product Brand component.
 *
 * @param {React.PropsWithChildren<ProductBrandPropsInterface>} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const ProductBrand: FunctionComponent<PropsWithChildren<ProductBrandPropsInterface>> = (
    props: PropsWithChildren<ProductBrandPropsInterface>
): ReactElement => {

    const {
        children,
        className,
        logo,
        name,
        style,
        version,
        [ "data-testid" ]: testId
    } = props;

    /**
     * Resolves the version label color.
     *
     * @return {SemanticCOLORS} Resolved color.
     */
    const resolveVersionLabelColor = (): SemanticCOLORS => {
        if (version.labelColor) {
            return version.labelColor;
        }

        if (version.releaseType === "alpha") {
            return "red";
        } else if (version.releaseType === "beta") {
            return "teal";
        } else if (version.releaseType === "rc") {
            return "green";
        } else if (version.releaseType === "milestone") {
            return "orange";
        }
        return "blue";
    };

    /**
     * Resolves the release version.
     *
     * @return {string} Resolved release version.
     */
    const resolveReleaseVersion = (): string => {
        if (!version.releaseType && !version.versionNumber) {
            return null;
        }

        let releaseVersion = version.versionNumber + " " + version.releaseType;

        if (version.releaseType === "milestone" && version.milestoneNumber) {
            releaseVersion = version.versionNumber + " " + "M" + version.milestoneNumber;
        }

        if (version.textCase === "lowercase") {
            return releaseVersion.toLowerCase();
        } else if (version.textCase === "uppercase") {
            return releaseVersion.toUpperCase();
        }

        return releaseVersion.toUpperCase();
    };

    return (
        <div className={ classNames(className, "product-title") } style={ style } data-testid={ testId }>
            { version && (version.releaseType || version.versionNumber) && (
                <div className="product-title-meta">
                    <Label
                        color={ resolveVersionLabelColor() }
                        className="version-label"
                        size="mini"
                        data-testid={ `${ testId }-version` }
                    >
                        { resolveReleaseVersion() }
                    </Label>
                </div>
            ) }
            <div className="product-title-main">
                { logo && logo }
                <Heading
                    className={ classNames(className, "product-title-text") }
                    style={ style }
                    data-testid={ `${ testId }-title` }
                    compact
                >
                    { name }
                </Heading>
                { children }
            </div>
        </div>
    );
};

/**
 * Default props for the product brand component.
 */
ProductBrand.defaultProps = {
    "data-testid": "product-brand"
};
