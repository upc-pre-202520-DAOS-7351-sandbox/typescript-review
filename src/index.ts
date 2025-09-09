/**
 * Demonstrates usage of the sales order behavior with real-time and manual scenarios.
 * @public
 */
import {Customer} from "./crm/domain/model/customer";
import {Currency} from "./shared/domain/model/currency";
import {SalesOrder} from "./sales/domain/model/sales-order";
import {ProductId} from "./sales/domain/model/product-id";

console.log('Thank you for using WebStorm 💙');

try {
    const customer = new Customer("John Doe");

    // Scenario 1: Real-time registration with USD and current date
    const usdCurrencyCode = "USD" as const;
    const usdCurrency = new Currency(usdCurrencyCode);
    const realTimeSalesOrder = new SalesOrder(customer.id, usdCurrency);
    realTimeSalesOrder.addItem(new ProductId(), 2, 100);
    realTimeSalesOrder.addItem(new ProductId(), 20, 50);
    realTimeSalesOrder.confirm();
    customer.lastOrderPrice = realTimeSalesOrder.calculateTotalAmount();
    console.log(`Real-time Order - Customer: ${customer.name}, ID: ${customer.id}, Ordered At: ${realTimeSalesOrder.getFormattedOrderedAt()}, State: ${realTimeSalesOrder.state}, Total: ${customer.lastOrderPrice?.format()}`);

    // Scenario 2: Manual registration with PEN and past date
    const penCurrencyCode = "PEN" as const;
    const penCurrency = new Currency(penCurrencyCode);
    const pastOrderDate = "2023-05-15T10:30:00Z";
    const manualSalesOrder = new SalesOrder(customer.id, penCurrency, pastOrderDate);
    manualSalesOrder.addItem(new ProductId(), 1, 150);
    manualSalesOrder.confirm(); // Must confirm before shipping
    manualSalesOrder.ship();
    customer.lastOrderPrice = manualSalesOrder.calculateTotalAmount();
    console.log(`Manual Order - Customer: ${customer.name}, ID: ${customer.id}, Ordered At: ${manualSalesOrder.getFormattedOrderedAt()}, State: ${manualSalesOrder.state}, Total: ${customer.lastOrderPrice?.format("es-PE")}`);

    // Test state constraints
    manualSalesOrder.confirm(); // Should throw error
} catch (error) {
    if (error instanceof Error) console.error(`Error: ${error.message}`); else console.error("An error occurred:", error);
}