# Triveous-assignment

## Schema

### user

```
    {
        username: String,
        email: String,
        password: String,
    }
```

### product

```
    {
        name: String,
        description: String,
        price: Number,
        category:String,
        image:String,
        availability: Boolean
       
    }
```

### Category

```
    {
        name: String,
        description:String
    }
```

### Cart

```
    {
        user: ObjectId,
        product: ObjectId,
        quantity: type: Number,

    }
```

### Order

```
    {
        user: ObjectId,
        products:[{product:ObjectId,price:Number,qunatity:Number}]
        
    }
```

# Routes :-

- ### Users Routes

| METHOD | ENDPOINT       | WHAT IT DOES                                                                          |
| ------ | -------------- | ------------------------------------------------------------------------------------- |
| POST   | /user/signup | -> Register New User (Requires user details in req.body)                              |
| POST   | /user/login    | -> Login existing user (Requires email and passwords, returns token if login success) |

- ### Category Routes

| METHOD | ENDPOINT              | WHAT IT DOES                                            |
| ------ | --------------------- | ------------------------------------------------------- |
| GET    | /category             | -> get all category                                     |
| POST   | /category/            | -> add new category (by providing categoryname in body) |

- ### Product Routes

| METHOD | ENDPOINT            | WHAT IT DOES                                                                                   |
| ------ | ------------------- | ---------------------------------------------------------------------------------------------- |
| POST   | /product/ | -> Add new product ( by providing name, price, description,image,category, availability in body) |
| GET    | /product            | -> getting all products                                                                        |
| GET    | /product/:id | -> getting products by id                                                                      |

- ### Cart Routes

| METHOD | ENDPOINT                         | WHAT IT DOES                                             |
| ------ | -------------------------------- | -------------------------------------------------------- |
| GET    | /cart                            | -> getting the items present in cart of a user logged in |
| POST   | /cart/add/:productID             | -> adding item to user's cart                            |
| DELETE | /cart/remove/:productId          | -> deleting item from cart                               |

- ### Order Routes

| METHOD | ENDPOINT          | WHAT IT DOES                                                    |
| ------ | ----------------- | --------------------------------------------------------------- |
| GET    | /order            | -> getting user's orders if the user is logged in                                    |
| POST   | /order/           | -> placing order (by passing userID, productID, cartID in body) |
| GET    | /order/:orderId   | -> getting details of a single order if the user is logged in                       |
| PATCH  | /order/history    | -> getting history of all the orders        |
