import React, { memo } from "react";
import DefaultTemplate from "./Template";
import type { TemplateProps } from "./Template";
import type { KcProps } from "./KcProps";
import type { KcContextBase } from "../getKcContext/KcContextBase";
import { clsx } from "../tools/clsx";
import type { I18n } from "../i18n";

export type RegisterProps = KcProps & {
    kcContext: KcContextBase.Register;
    i18n: I18n;
    doFetchDefaultThemeResources?: boolean;
    Template?: (props: TemplateProps) => JSX.Element | null;
};

const Register = memo((props: RegisterProps) => {
    const { kcContext, i18n, doFetchDefaultThemeResources = true, Template = DefaultTemplate, ...kcProps } = props;

    const { url, messagesPerField, register, realm, passwordRequired, recaptchaRequired, recaptchaSiteKey } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            {...{ kcContext, i18n, doFetchDefaultThemeResources, ...kcProps }}
            headerNode={"Tạo tài khoản C.OPE2N"}
            formNode={
                <form id="kc-register-form" className={clsx(kcProps.kcFormClass)} action={url.registrationAction} method="post">
                    <div className={clsx(kcProps.kcFormGroupClass, messagesPerField.printIfExists("firstName", kcProps.kcFormGroupErrorClass))}>
                        <div className={clsx(kcProps.kcLabelWrapperClass)}>
                            <label htmlFor="firstName" className={clsx(kcProps.kcLabelClass)}>
                                {"Họ"}
                            </label>
                        </div>
                        <div className={clsx(kcProps.kcInputWrapperClass)}>
                            <input
                                type="text"
                                id="firstName"
                                className={`${clsx(kcProps.kcInputClass)} kc-form-input`}
                                name="firstName"
                                defaultValue={register.formData.firstName ?? ""}
                            />
                        </div>
                    </div>

                    <div className={clsx(kcProps.kcFormGroupClass, messagesPerField.printIfExists("lastName", kcProps.kcFormGroupErrorClass))}>
                        <div className={clsx(kcProps.kcLabelWrapperClass)}>
                            <label htmlFor="lastName" className={clsx(kcProps.kcLabelClass)}>
                                {"Tên"}
                            </label>
                        </div>
                        <div className={clsx(kcProps.kcInputWrapperClass)}>
                            <input
                                type="text"
                                id="lastName"
                                className={`${clsx(kcProps.kcInputClass)} kc-form-input`}
                                name="lastName"
                                defaultValue={register.formData.lastName ?? ""}
                            />
                        </div>
                    </div>

                    <div className={clsx(kcProps.kcFormGroupClass, messagesPerField.printIfExists("email", kcProps.kcFormGroupErrorClass))}>
                        <div className={clsx(kcProps.kcLabelWrapperClass)}>
                            <label htmlFor="email" className={clsx(kcProps.kcLabelClass)}>
                                {msg("email")}
                            </label>
                        </div>
                        <div className={clsx(kcProps.kcInputWrapperClass)}>
                            <input
                                type="text"
                                id="email"
                                className={`${clsx(kcProps.kcInputClass)} kc-form-input`}
                                name="email"
                                defaultValue={register.formData.email ?? ""}
                                autoComplete="email"
                            />
                        </div>
                    </div>
                    {!realm.registrationEmailAsUsername && (
                        <div className={clsx(kcProps.kcFormGroupClass, messagesPerField.printIfExists("username", kcProps.kcFormGroupErrorClass))}>
                            <div className={clsx(kcProps.kcLabelWrapperClass)}>
                                <label htmlFor="username" className={clsx(kcProps.kcLabelClass)}>
                                    {"Tài khoản"}
                                </label>
                            </div>
                            <div className={clsx(kcProps.kcInputWrapperClass)}>
                                <input
                                    type="text"
                                    id="username"
                                    className={`${clsx(kcProps.kcInputClass)} kc-form-input`}
                                    name="username"
                                    defaultValue={register.formData.username ?? ""}
                                    autoComplete="username"
                                />
                            </div>
                        </div>
                    )}
                    {passwordRequired && (
                        <>
                            <div
                                className={clsx(kcProps.kcFormGroupClass, messagesPerField.printIfExists("password", kcProps.kcFormGroupErrorClass))}
                            >
                                <div className={clsx(kcProps.kcLabelWrapperClass)}>
                                    <label htmlFor="password" className={clsx(kcProps.kcLabelClass)}>
                                        {"Mật khẩu"}
                                    </label>
                                </div>
                                <div className={clsx(kcProps.kcInputWrapperClass)}>
                                    <input
                                        type="password"
                                        id="password"
                                        className={`${clsx(kcProps.kcInputClass)} kc-form-input`}
                                        name="password"
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>

                            <div
                                className={clsx(
                                    kcProps.kcFormGroupClass,
                                    messagesPerField.printIfExists("password-confirm", kcProps.kcFormGroupErrorClass)
                                )}
                            >
                                <div className={clsx(kcProps.kcLabelWrapperClass)}>
                                    <label htmlFor="password-confirm" className={clsx(kcProps.kcLabelClass)}>
                                        {"Nhập lại mật khẩu"}
                                    </label>
                                </div>
                                <div className={clsx(kcProps.kcInputWrapperClass)}>
                                    <input type="password" id="password-confirm" className={`${clsx(kcProps.kcInputClass)} kc-form-input`} name="password-confirm" />
                                </div>
                            </div>
                        </>
                    )}
                    {recaptchaRequired && (
                        <div className="form-group">
                            <div className={clsx(kcProps.kcInputWrapperClass)}>
                                <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey}></div>
                            </div>
                        </div>
                    )}
                    <div className={clsx(kcProps.kcFormGroupClass)}>
                        <div id="kc-form-options" className={clsx(kcProps.kcFormOptionsClass)}>
                            <div className={clsx(kcProps.kcFormOptionsWrapperClass)}>
                                <span>
                                    <a href={url.loginUrl}>{"<<Quay lại trang đăng nhập"}</a>
                                </span>
                            </div>
                        </div>

                        <div id="kc-form-buttons" className={clsx(kcProps.kcFormButtonsClass)}>
                            <input
                                className={`${clsx(
                                    kcProps.kcButtonClass,
                                    kcProps.kcButtonPrimaryClass,
                                    kcProps.kcButtonBlockClass,
                                    kcProps.kcButtonLargeClass
                                )} kc-button`}
                                type="submit"
                                value={"Đăng ký"}
                            />
                        </div>
                    </div>
                </form>
            }
        />
    );
});

export default Register;
