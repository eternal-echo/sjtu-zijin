// ==UserScript==
// @name         核销自动刷新
// @namespace    http://tampermonkey.net/
// @version      2024-04-10
// @description  场馆预约核销自动刷新并自动打开个人订单，然后点击场地核销
// @author       You
// @match        https://sports.sjtu.edu.cn/index
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sjtu.edu.cn
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log('核销自动刷新脚本已加载');

    // 页面完全加载后执行操作
    window.addEventListener('load', function() {
        console.log('页面已完全加载');

        // 尝试点击“个人订单”链接
        try {
            const personalOrderLink = document.querySelector('a.menuItem[href="/venue/personal"]');
            if (personalOrderLink) {
                console.log('找到“个人订单”链接');

                // 确保链接可见，然后点击
                if (personalOrderLink.offsetParent !== null) {
                    console.log('“个人订单”链接可见，正在尝试点击');
                    personalOrderLink.click();

                    // 等待页面响应并加载“场地核销”按钮
                    console.log('等待页面加载“场地核销”按钮...');
                    setTimeout(() => {
                        const siteVerificationButton = document.querySelector('a.btn.btn-info.btn-xs[onclick="siteVerification()"]');
                        if (siteVerificationButton && siteVerificationButton.offsetParent !== null) {
                            console.log('找到“场地核销”按钮，正在尝试点击');
                            siteVerificationButton.click();
                        } else {
                            console.log('未找到“场地核销”按钮或按钮不可见');
                        }
                    }, 2000); // 延迟2秒以等待页面加载
                } else {
                    console.log('“个人订单”链接不可见，尝试展开父级菜单');
                    // 如果链接不可见，尝试展开父级菜单
                    const parentMenus = document.querySelectorAll('.fa.arrow');
                    parentMenus.forEach(menu => {
                        if (menu.offsetParent !== null) {
                            menu.click();
                        }
                    });
                    // 之后再次尝试点击“个人订单”，然后点击“场地核销”
                    setTimeout(() => {
                        if (personalOrderLink.offsetParent !== null) {
                            console.log('再次尝试点击“个人订单”链接');
                            personalOrderLink.click();
                            setTimeout(() => {
                                const siteVerificationButton = document.querySelector('a.btn.btn-info.btn-xs[onclick="siteVerification()"]');
                                if (siteVerificationButton && siteVerificationButton.offsetParent !== null) {
                                    console.log('找到“场地核销”按钮，正在尝试点击');
                                    siteVerificationButton.click();
                                } else {
                                    console.log('未找到“场地核销”按钮或按钮不可见');
                                }
                            }, 2000); // 延迟2秒以等待页面加载
                        }
                    }, 500); // 延迟500毫秒以等待菜单展开
                }
            } else {
                console.log('未找到“个人订单”链接');
            }
        } catch (e) {
            console.error('自动点击操作失败:', e);
        }
    });


    // 设置定时器，29分钟刷新页面
    setInterval(function() {
        window.location.reload();
    }, 29 * 60 * 1000);
})();