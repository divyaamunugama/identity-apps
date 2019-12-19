/*
 *  Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package org.wso2.identity.apps.common.internal;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.osgi.framework.BundleContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.osgi.service.component.annotations.ReferencePolicy;
import org.wso2.carbon.identity.application.mgt.ApplicationManagementService;
import org.wso2.carbon.identity.core.util.IdentityCoreInitializedEvent;
import org.wso2.carbon.identity.oauth.OAuthAdminServiceImpl;
import org.wso2.carbon.registry.core.service.RegistryService;
import org.wso2.identity.apps.common.util.AppPortalUtils;

import static org.wso2.carbon.utils.multitenancy.MultitenantConstants.SUPER_TENANT_DOMAIN_NAME;
import static org.wso2.carbon.utils.multitenancy.MultitenantConstants.SUPER_TENANT_ID;

/***
 * OSGi service component which configure the service providers for portals.
 */
@Component(name = "org.wso2.identity.apps.common.AppsCommonServiceComponent",
           immediate = true,
           property = {
                   "componentName=identity-apps-common"
           })
public class AppsCommonServiceComponent {

    private static Log log = LogFactory.getLog(AppsCommonServiceComponent.class);

    @Activate
    protected void activate(BundleContext bundleContext) {

        try {
            // Initialize portal applications.
            AppPortalUtils.initiatePortals(SUPER_TENANT_DOMAIN_NAME, SUPER_TENANT_ID);
            // TODO: Uncomment this when tenant qualified path is available.
            //bundleContext.registerService(TenantMgtListener.class.getName(), new AppPortalTenantMgtListener(), null);

            log.info("Identity apps common service component activated successfully.");
        } catch (Throwable e) {
            log.error("Failed to activate identity apps common service component.", e);
        }
    }

    @Reference(name = "registry.service",
               service = RegistryService.class,
               cardinality = ReferenceCardinality.MANDATORY,
               policy = ReferencePolicy.DYNAMIC,
               unbind = "unsetRegistryService")
    protected void setRegistryService(RegistryService registryService) {

        if (log.isDebugEnabled()) {
            log.debug("Setting the Registry Service.");
        }
        AppsCommonDataHolder.getInstance().setRegistryService(registryService);
    }

    protected void unsetRegistryService(RegistryService registryService) {

        if (log.isDebugEnabled()) {
            log.debug("Un-setting the Registry Service.");
        }
        AppsCommonDataHolder.getInstance().setRegistryService(null);
    }

    @Reference(name = "application.mgt.service",
               service = ApplicationManagementService.class,
               cardinality = ReferenceCardinality.MANDATORY,
               policy = ReferencePolicy.DYNAMIC,
               unbind = "unsetApplicationManagementService")
    protected void setApplicationManagementService(ApplicationManagementService applicationManagementService) {

        if (log.isDebugEnabled()) {
            log.debug("Setting the Application Management Service.");
        }
        AppsCommonDataHolder.getInstance().setApplicationManagementService(applicationManagementService);
    }

    protected void unsetApplicationManagementService(ApplicationManagementService applicationManagementService) {

        if (log.isDebugEnabled()) {
            log.debug("Un-setting the Application Management Service.");
        }
        AppsCommonDataHolder.getInstance().setApplicationManagementService(null);
    }

    @Reference(name = "oauth.admin.service",
               service = OAuthAdminServiceImpl.class,
               cardinality = ReferenceCardinality.MANDATORY,
               policy = ReferencePolicy.DYNAMIC,
               unbind = "unsetOAuthAdminService")
    protected void setOAuthAdminService(OAuthAdminServiceImpl oAuthAdminService) {

        if (log.isDebugEnabled()) {
            log.debug("Setting the OAuth Admin Service.");
        }
        AppsCommonDataHolder.getInstance().setOAuthAdminService(oAuthAdminService);
    }

    protected void unsetOAuthAdminService(OAuthAdminServiceImpl oAuthAdminService) {

        if (log.isDebugEnabled()) {
            log.debug("Un-setting the OAuth Admin Service.");
        }
        AppsCommonDataHolder.getInstance().setOAuthAdminService(null);
    }

    @Reference(name = "identity.core.init.event.service",
               service = IdentityCoreInitializedEvent.class,
               cardinality = ReferenceCardinality.MANDATORY,
               policy = ReferencePolicy.DYNAMIC,
               unbind = "unsetIdentityCoreInitializedEventService")
    protected void setIdentityCoreInitializedEventService(IdentityCoreInitializedEvent identityCoreInitializedEvent) {

        // Reference IdentityCoreInitializedEvent service to guarantee that this component will wait until identity core
        // is started.
    }

    protected void unsetIdentityCoreInitializedEventService(IdentityCoreInitializedEvent identityCoreInitializedEvent) {

    }
}
