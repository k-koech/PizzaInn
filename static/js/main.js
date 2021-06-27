
// fLOATING BUTTON BLINKING
function blink_text() {
    $('.blink').fadeOut(500);
    $('.blink').fadeIn(500);
}
setInterval(blink_text, 1000);


// Constructors
function Order(pizza,pizzaPrice, crust, crustPrice)
{
   this.pizzaSize = {
    size: pizza,
    price: pizzaPrice
   };
   this.crust = {
       crustName : crust,
       price : crustPrice
   };
   this.toppings = [];
   this.addresses = [];
}

function Topping(name, price)
{
   this.toppingName = name;
   this.price = price;
}

function Address(street, town, county)
{
    this.street = street;
    this.town = town;
    this.county = county;
}
//  Prototype
Address.prototype.fullAddress = function()
{
    return this.street + " " + this.town + " " + this.county;
}

// Prices objects
var totalCost = 0;
var deliveryFee=150;
var totalToppingCost = 0;
var pizzaPrices = {
    Small: 600,
    Medium: 1200,
    Large: 1800
}
var crustPrices = {
    Crispy: 200,
    Stuffed: 190,
    Gluten_Free: 300
}
var toppingPrices = {
    Pepperoni: 300,
    Sausage: 230,
    Bacon: 340,
    Green_Peppers: 190
}


// If delivery checkbox is checked show ad delivery address button
$("#delivery-checkbox").click(function(event){
  $(".addAddress").toggle();
});
// Find the total cost after checkout button is clicked 
$(document).ready(function(){
    $("button.checkout").click(function(event){
        $("#summary-body").append("<tr><td>Delivery Address</td><td>"+ address.fullAddress + "</td><tr> <td>Total Order Costs</td> <td>Ksh. "
        + (totalCost + totalToppingCost) +
        "</td></tr><tr><td>Delivery Fee </td><td>Ksh. "+ deliveryFee + "</td><tr><td><strong>Grand Total</td><td>Ksh. "
        + (totalCost + totalToppingCost+deliveryFee) + "</strong></td></tr>");

        // var orderNumber = Ra();
        $(".order-number").html("ORD"+6837);
      });
});


$(document).ready(function(){
  
  // Order form
    $("form#new-order").submit(function(event){
        event.preventDefault();

    var pizzaSize = $("#pizza-size").val();
    var crust = $("#crust").val();

    var checkBoxes = document.getElementsByClassName( 'form-check-input' );
    var isChecked = false;
    for (var i = 0; i < checkBoxes.length; i++) 
    {
        if ( checkBoxes[i].checked ) 
        {
            isChecked = true;
        };
    }

    if ( !isChecked ) 
    {
        alert( 'Please, add ateast one Topping!' );
    } 
    else 
    { 
        // showing and hding order and continue button
            $(".order-button", this)
            .val("Please Wait...")
            .text("Continue Shopping");

        var pizzaPrice = pizzaPrices[pizzaSize];
        var crustPrice = crustPrices[crust];
        var newOrder = new Order(pizzaSize,pizzaPrice, crust, crustPrice);
            
        // Each checked
            $('#topping:checked').each(function() {
            
                var toppingPrice = toppingPrices[$(this).val()];
                totalToppingCost = totalToppingCost + toppingPrice;
                
                var newTopping = new Topping($(this).val(), toppingPrice);
                newOrder.toppings.push(newTopping);
            });

        totalCost = totalCost + (pizzaPrice + crustPrice );
        $(".totalCost").text(totalCost + totalToppingCost );
          
        //  display orders every time they are added
        $("#order-body").append("<tr> <td></td> <td>"+ newOrder.pizzaSize.size +"</td><td>"+ 
        newOrder.crust.crustName +"</td><td> "+ newOrder.toppings[0].price+ "</td><td>Ksh. "+ newOrder.pizzaSize.price +" Ksh.. "+ newOrder.crust.price +"</td></tr>");
        
        // only show order details after atleast an order has been made
        $('.order-col2').slideDown(500);
    }
 });

    //    Saving Data From Address form
    $("form#address").submit(function(event){
        event.preventDefault();

        var street = $(".street").val();
        var town = $(".town").val();
        var county = $(".county").val();

        var newAddress= new Address(street,town,county);
      
        // hide modal after submit
        $('.address-modal').hide();
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        // disable button after address has been added
        $(".addAddress").html('<i class="fa fa-check" aria-hidden="true"></i> Delivery address added!');
        $(".addAddress").attr("disabled", true);

    });
        

});