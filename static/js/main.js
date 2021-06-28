
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
var newAddress;
var street;
var town=null;
var county;
        
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
// Toppings depending on the sizes
var largeToppingPrices = {
    Pepperoni: 300,
    Sausage: 230,
    Bacon: 340,
    Green_Peppers: 190
}

var mediumToppingPrices = {
    Pepperoni: 250,
    Sausage: 200,
    Bacon: 220,
    Green_Peppers: 130
}
var smallToppingPrices = {
    Pepperoni: 180,
    Sausage: 150,
    Bacon: 170,
    Green_Peppers: 100
}
// If delivery checkbox is checked show ad delivery address button
$("#delivery-checkbox").click(function(event){
  $(".addAddress").toggle();
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
            var displayToppings = [];
            $('#topping:checked').each(function() 
            {
                
                displayToppings.push($(this).val());
                var toppingPrice;
                if(pizzaSize=="Small")
                {
                    toppingPrice = smallToppingPrices[$(this).val()];
                }
                else if(pizzaSize=="Medium")
                {
                    toppingPrice = mediumToppingPrices[$(this).val()];
                }
                else
                {
                    toppingPrice = largeToppingPrices[$(this).val()];
                }
                
                totalToppingCost = totalToppingCost + toppingPrice;
                
                var newTopping = new Topping($(this).val(), toppingPrice);
                newOrder.toppings.push(newTopping);
            });

        totalCost = totalCost + (pizzaPrice + crustPrice );
        $(".totalCost").text(totalCost + totalToppingCost );
          
        //  display orders every time they are added
        $("#order-body").append("<tr> <td></td> <td>"+ newOrder.pizzaSize.size +"</td><td>"+ 
        newOrder.crust.crustName +"</td><td  class='toppingCell'> " + displayToppings + "</td><td>Ksh. "+ (newOrder.pizzaSize.price + newOrder.crust.price+totalToppingCost) +"</td></tr>");
        
        // only show order details after atleast an order has been made
        $('#order-details').slideDown(500);
        $('#col2-img').hide(1000);
        
    }
 });

    //    Saving Data From Address form
    $("form#address").submit(function(event){
        event.preventDefault();

        street = $(".street").val();
        town = $(".town").val();
        county = $(".county").val();
        newAddress= new Address(street,town,county);

        // hide modal after submit
        $('.address-modal').hide();
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        // disable button after address has been added
        $(".addAddress").html('<i class="fa fa-check" aria-hidden="true"></i> Delivery address added!');
        $(".addAddress").attr("disabled", true);

    });
        

});



// Find the total cost after checkout button is clicked 
$(document).ready(function(){
    $("button.checkout").click(function(event){
        var address;

        if(town === null)
        {
            $(".deliveryAddress").hide();
            $(".deliveryFee").hide();
            $(".grandTotal").html("Ksh. " + (totalCost + totalToppingCost));
        }
    
        else
        {
            $(".deliveryAddress").text(town);
            $(".deliveryFee").html("Ksh. " + deliveryFee);
            $(".grandTotal").html("Ksh. " + (totalCost + totalToppingCost+deliveryFee));
        }

        
        $(".totalOrderCosts").html("Ksh. " + (totalCost + totalToppingCost));
        
      
        // var orderNumber = Ra();
        $(".order-number").html("ORD"+Math.floor(Math.random()*(1000-10000)));

        // console.log(newAddress.street);      

        // $(".checkout").attr("disabled", true);
      

      });
});



// show back to top button on scroll
$(window).scroll(function() {
    if ($(this).scrollTop()) {
        $('.backToTop:hidden').stop(true, true).fadeIn();
    } else {
        $('.backToTop').stop(true, true).fadeOut();
    }
});

