import { test as base } from "@playwright/test";
import { CheckoutPage } from "../page-object/checkout-page/checkoutPage";
import { ProductPage } from "../page-object/product-page/productPage";
import { URLs } from "../enums/URLs";

export { expect } from "@playwright/test";

type CheckoutFixture = {

    checkoutPage: CheckoutPage,
    withExpandedLoginForm: CheckoutPage,
    withExpandedCouponForm: CheckoutPage
}


export const test = base.extend<CheckoutFixture>({

    checkoutPage:async ({page}, use) => {
        
        const productPage = new ProductPage(page);

        await productPage.goto(URLs.AmariShirtProduct);
        await productPage.getQuantityField().setQuantity('1');
        await productPage.clickAddToCartButton();

        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.goto(URLs.CheckoutPage);
        await use(checkoutPage);
    },

    withExpandedLoginForm:async ({checkoutPage}, use) => {
        
        await checkoutPage.clickLoginLink();
        const loginFormExpanded = checkoutPage;

        await use(loginFormExpanded);
    },

    withExpandedCouponForm:async ({checkoutPage}, use) => {
        
        await checkoutPage.clickCouponCodeLink();
        const couponFormExpanded = checkoutPage;

        await use(couponFormExpanded);
    }
})