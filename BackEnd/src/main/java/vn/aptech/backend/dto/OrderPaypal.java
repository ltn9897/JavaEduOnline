package vn.aptech.backend.dto;

import com.google.gson.JsonObject;
import com.paypal.api.payments.Order;
import com.paypal.base.rest.*;
import com.paypal.base.sdk.info.SDKVersionImpl;
import lombok.NoArgsConstructor;

import java.util.HashMap;

@NoArgsConstructor
public class OrderPaypal {
    public JsonObject get(String accessToken, String orderId) throws PayPalRESTException {
        APIContext apiContext = new APIContext(accessToken);
        return get(apiContext, orderId);
    }

    public static JsonObject get(APIContext apiContext, String orderId) throws PayPalRESTException {
        if (apiContext == null) {
            throw new IllegalArgumentException("APIContext cannot be null");
        } else if (apiContext.getAccessToken() != null && apiContext.getAccessToken().trim().length() > 0) {
            if (apiContext.getHTTPHeaders() == null) {
                apiContext.setHTTPHeaders(new HashMap());
            }

            apiContext.getHTTPHeaders().put("Content-Type", "application/json");
            apiContext.setSdkVersion(new SDKVersionImpl());
            if (orderId == null) {
                throw new IllegalArgumentException("orderId cannot be null");
            } else {
                Object[] parameters = new Object[]{orderId};
                String pattern = "v1/checkout/orders/{0}";
                String resourcePath = RESTUtil.formatURIPath(pattern, parameters);
                String payLoad = "";
                return PayPalResource.configureAndExecute(apiContext, HttpMethod.GET, resourcePath, payLoad, JsonObject.class);
            }
        } else {
            throw new IllegalArgumentException("AccessToken cannot be null or empty");
        }
    }
}
