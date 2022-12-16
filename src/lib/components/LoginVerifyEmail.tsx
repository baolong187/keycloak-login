import React, { memo } from "react";
import DefaultTemplate from "./Template";
import type { TemplateProps } from "./Template";
import type { KcProps } from "./KcProps";
import type { KcContextBase } from "../getKcContext/KcContextBase";
import type { I18n } from "../i18n";

export type LoginVerifyEmailProps = KcProps & {
    kcContext: KcContextBase.LoginVerifyEmail;
    i18n: I18n;
    doFetchDefaultThemeResources?: boolean;
    Template?: (props: TemplateProps) => JSX.Element | null;
};

const LoginVerifyEmail = memo((props: LoginVerifyEmailProps) => {
    const { kcContext, i18n, doFetchDefaultThemeResources = true, Template = DefaultTemplate, ...kcProps } = props;

    const { msg } = i18n;

    const { url, user } = kcContext;

    return (
        <Template
            {...{ kcContext, i18n, doFetchDefaultThemeResources, ...kcProps }}
            displayMessage={false}
            headerNode={"Email xác thực"}
            formNode={
                <>
                    <p className="instruction">{msg("emailVerifyInstruction1", user?.email)}</p>
                    <p className="instruction">
                        {"Không nhận được mã xác minh trong email của bạn?"}
                        <br />
                        <a href={url.loginAction}>{"Ấn vào đây"}</a>
                        &nbsp;
                        {"gửi lại email."}
                    </p>
                </>
            }
        />
    );
});

export default LoginVerifyEmail;
