import React, { memo } from "react";
import DefaultTemplate from "./Template";
import type { TemplateProps } from "./Template";
import type { KcProps } from "./KcProps";
import type { KcContextBase } from "../getKcContext/KcContextBase";
import type { I18n } from "../i18n";

export type LoginPageExpired = KcProps & {
    kcContext: KcContextBase.LoginPageExpired;
    i18n: I18n;
    doFetchDefaultThemeResources?: boolean;
    Template?: (props: TemplateProps) => JSX.Element | null;
};

const LoginPageExpired = memo((props: LoginPageExpired) => {
    const { kcContext, i18n, doFetchDefaultThemeResources = true, Template = DefaultTemplate, ...kcProps } = props;

    const { url } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            {...{ kcContext, i18n, doFetchDefaultThemeResources, ...kcProps }}
            displayMessage={false}
            headerNode={"Phiên đăng nhập đã hết hạn"}
            formNode={
                <>
                    <p id="instruction1" className="instruction">
                        {"Vui lòng đăng nhập lại"}
                        <a id="loginRestartLink" href={url.loginRestartFlowUrl}>
                            {"Ấn vào đây"}
                        </a>{" "}
                        .<br />
                        {"Để tiếp tục truy cập"}{" "}
                        <a id="loginContinueLink" href={url.loginAction}>
                            {"Ấn vào đây"}
                        </a>{" "}
                        .
                    </p>
                </>
            }
        />
    );
});

export default LoginPageExpired;
