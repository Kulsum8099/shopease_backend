# My Kitchen Backend

This project is a backend application for managing data and operations of My Kitchen

## Installation

For installation:

```bash
yarn install
```

After successful installation:

```bash
yarn start
```

## Framework and Libraries

**Framework:** express 4.18.2 \
**Database:** mongodb \
**ODM:** mongoose 7.2.1 \
**Encryption Tool:** bcryptjs: 2.4.3 \
**Token Tool:** jsonwebtoken 9.0.2 \
**Other Important Packages:** multer, ts-node-dev, zod, dotenv, cors \
**Frontend URL:** \
**Backend URL:** https://mykitchen.creativeati.xyz/

## Modules

This application contains the following modules:

1. Auth
2. Brands
3. Categories
4. Colors
5. Finishes
6. Installation Types
7. Materials
8. Styles
9. Products

## Documentation

Each module contains the following files:

**1. Interface:** This file contains the type of the corresponding model and type of any other variable related to that model.

**2. Validation:** This file contains the expected type of each value for validation which is done using **zod**. This validation is done on route level, before accessing the controller.

**3. Model:** This file contains the schema of the module made with mongoose. This also has the second layer of validation done by mongoose.

**4. Service:** This file contains the calculation of data, handling business login and interaction with database.

**5. Controller:** This file handles the http request, parses data, calls the appropriate service and returns proper response with results.

**6. Route:** This file contains all the api endpoints of that particular module. Each endpoint contains the url of the endpoint, authentication method if necessary, image uploading function where image uploading is used, validation using zod and finally the name of the controller.

### Other important methods and handlers:

**globalerrorHandler** for handling all errors in one file.

**validateRequest** for validating zod validation

**routes** for storing route files of all modules

**config** for configuring environment variables

**errors** for handling api errors, cast errors, mongoose validation error and zod validation errors.

**asyncHandler** for handling asynchronous functions

**sendResponse** for handling successful api responses

## API Documentation:

Api documentation can be found in the [root url](https://mykitchen.creativeati.xyz/) of the project. That HTML file can be found in the public folder. There is also a json file named mk.postman_collection.json in the root folder that can be imported into the **Postman** application.

## ER Diagram

The ER Diagram file of the project is located on the root folder named as my-kitchen-diagram.drawio

## License

[MIT](https://choosealicense.com/licenses/mit/)
