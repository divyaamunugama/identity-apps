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
import { Field, Wizard, WizardPage } from "@wso2is/form";
import React, { FunctionComponent, ReactElement, useEffect } from "react";
import { useTranslation } from "react-i18next";

const SCOPE_NAME_MAX_LENGTH: number = 40;
const SCOPE_DISPLAY_NAME_MAX_LENGTH: number = 40;
const SCOPE_DESCRIPTION_MAX_LENGTH: number = 100;
const FIELD_WIDTH: number = 10;

/**
 * Proptypes for add OIDC scope form component.
 */
interface AddOIDCScopeFormPropsInterface extends TestableComponentInterface {
    initialValues: any;
    triggerSubmission: any;
    triggerSubmit: boolean;
    onSubmit: (values: any) => void;
}

/**
 * Add OIDC scope form component.
 *
 * @param {AddOIDCScopeFormPropsInterface} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const AddOIDCScopeForm: FunctionComponent<AddOIDCScopeFormPropsInterface> = (
    props: AddOIDCScopeFormPropsInterface
): ReactElement => {

    const {
        initialValues,
        triggerSubmit,
        triggerSubmission,
        onSubmit,
        [ "data-testid" ]: testId
    } = props;

    const { t } = useTranslation();

    const getFormValues = (values: any) => {
        return {
            description: values?.description?.toString(),
            displayName: values?.displayName?.toString(),
            scopeName: values?.scopeName?.toString()
        };
    };

let triggerPreviousForm: () => void;

    return (
    <Wizard
        initialValues={ {
            scopeName: initialValues?.scopeName,
            displayName: initialValues?.displayName,
            description: initialValues?.description
        } }
        onSubmit={ (values) => {
            onSubmit(getFormValues(values));
        } }
        triggerSubmit={ (submitFunction) => triggerSubmission(submitFunction) }
        triggerPrevious={ (previousFunction: () => void) => {
            triggerPreviousForm = previousFunction; } }
    >
        <WizardPage
            validate={ (values): any => {
                const errors:any = {};
                if (!values.scopeName && !initialValues?.scopeName) {
                    errors.scopeName = t("console:manage.features.oidcScopes.forms.addScopeForm.inputs." +
                    "scopeName.validations.empty");
                }
                if (!values.displayName && !initialValues?.displayName) {
                    errors.displayName = t("console:manage.features.oidcScopes.forms.addScopeForm.inputs." +
                    "displayName.validations.empty");
                }
                return errors;
            } }
        >
            <Field.Input
                data-testid={ `${ testId }-oidc-scope-form-name-input` }
                ariaLabel="scopeName"
                inputType="name"
                name="scopeName"
                label={ t("console:manage.features.oidcScopes.forms.addScopeForm.inputs.scopeName.label") }
                required={ true }
                requiredErrorMessage={ t("console:manage.features.oidcScopes.forms.addScopeForm.inputs." +
                    "scopeName.validations.empty") }
                placeholder={ t("console:manage.features.oidcScopes.forms.addScopeForm.inputs." +
                    "scopeName.placeholder") }
                validation={ (value: string) => {
                    if (!value.toString().match(/^[\w.-]+$/)) {
                        return t("console:manage.features.oidcScopes.forms.addScopeForm.inputs." +
                            "scopeName.validations.invalid");
                    }
                } }
                maxLength={ SCOPE_NAME_MAX_LENGTH }
                minLength={ 3 }
                width={ FIELD_WIDTH }
            />
            <Field.Input
                ariaLabel="displayName"
                inputType="resourceName"
                data-testid={ `${ testId }-oidc-scope-form-name-input` }
                name="displayName"
                label={ t("console:manage.features.oidcScopes.forms.addScopeForm." +
                    "inputs.displayName.label") }
                required={ true }
                message={ t("console:manage.features.oidcScopes.forms.addScopeForm.inputs." +
                    "displayName.validations.empty") }
                placeholder={ t("console:manage.features.oidcScopes.forms.addScopeForm.inputs." +
                    "displayName.placeholder") }
                maxLength={ SCOPE_DISPLAY_NAME_MAX_LENGTH }
                minLength={ 3 }
                width={ FIELD_WIDTH }
            />
            <Field.Input
                data-testid={ `${ testId }-oidc-scope-form-name-input` }
                ariaLabel="description"
                inputType="resourceName"
                name="description"
                label={ t("console:manage.features.oidcScopes.forms.addScopeForm." +
                    "inputs.description.label") }
                required={ false }
                placeholder={ t("console:manage.features.oidcScopes.forms.addScopeForm.inputs." +
                    "description.placeholder") }
                maxLength={ SCOPE_DESCRIPTION_MAX_LENGTH }
                minLength={ 3 }
                width={ FIELD_WIDTH }
            />
        </WizardPage>
    </Wizard>
    );
};
