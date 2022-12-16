import React, { memo } from "react";
import DefaultTemplate from "./Template";
import type { TemplateProps } from "./Template";
import type { KcProps } from "./KcProps";
import type { KcContextBase } from "../getKcContext/KcContextBase";
import type { I18n } from "../i18n";

export type LoginIdpLinkEmailProps = KcProps & {
    kcContext: KcContextBase.LoginIdpLinkEmail;
    i18n: I18n;
    doFetchDefaultThemeResources?: boolean;
    Template?: (props: TemplateProps) => JSX.Element | null;
};

const LoginIdpLinkEmail = memo((props: LoginIdpLinkEmailProps) => {
    const { kcContext, i18n, doFetchDefaultThemeResources = true, Template = DefaultTemplate, ...kcProps } = props;

    const { url, realm, brokerContext, idpAlias } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            {...{ kcContext, i18n, doFetchDefaultThemeResources, ...kcProps }}
            headerNode={msg("emailLinkIdpTitle", idpAlias)}
            formNode={
                <>
                    <p id="instruction1" className="instruction">
                        {msg("emailLinkIdp1", idpAlias, brokerContext.username, realm.displayName)}
                    </p>
                    <p id="instruction2" className="instruction">
                        {"Trong trường hợp không nhận được mã xác minh?"} <a href={url.loginAction}>{"Ấn vào đây"}</a> {"để gửi lại email."}
                    </p>
                    <p id="instruction3" className="instruction">
                        {"Nếu bạn đã xác minh tài khoản thành công trên trình duyệt khác"} <a href={url.loginAction}>{"Ấn vào đây"}</a> {"để tiếp tục."}
                    </p>
                </>
            }
        />
    );
});

export default LoginIdpLinkEmail;
