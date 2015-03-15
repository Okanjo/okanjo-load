/**
 * Date: 3/14/15 10:02 PM
 *
 * ----
 *
 * (c) Okanjo Partners Inc
 * https://okanjo.com
 * support@okanjo.com
 *
 * https://github.com/okanjo/okanjo-load
 *
 * ----
 *
 * TL;DR? see: http://www.tldrlegal.com/license/mit-license
 *
 * The MIT License (MIT)
 * Copyright (c) 2013 Okanjo Partners Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */



var okanjo = require('okanjo'),
    async = require('async'),
    config = require('./../config');


/**
 * This is where you should integrate with your data source to all the data you need to create products
 *
 * This function should callback with two parameters:
 * 1) err - should be null when no error was detected or an Error object if one was detected
 * 2) array of data - this should be the primary result set, representing one product per index
 *
 * The result of this callback is piped directly into the processAndLoadProducts function below
 *
 * @param {function(err:Error, data:[*])} callback – Function called after the data has been retrieved
 */
function getSourceProducts(callback) {

    /************************
     * TODO: CUSTOMIZE THIS *
     ************************/

    /* MYSQL EXAMPLE - do an npm install mysql
     var mysql      = require('mysql');
     var connection = mysql.createConnection({
     host     : 'localhost',
     user     : 'me',
     password : 'secret'
     });

     connection.connect();

     connection.query('SELECT * FROM products WHERE import = 1 AND stock > 0', function(err, rows, fields) {
     if (err) callback && callback(err);

     callback && callback(null, rows);
     });

     connection.end();
     */


    /* MONGO EXAMPLE - do an npm install mongodb
     var MongoClient = require('mongodb').MongoClient
     , format = require('util').format;

     MongoClient.connect('mongodb://localhost:27017/test_db', function(err, db) {
     if(err) throw err;

     var collection = db
     .collection('products')
     .find({})
     .toArray(function(err, docs) {
     if (err) callback && callback(err);

     callback && callback(null, docs);
     });
     });
     */

    //
    // Here's a default example of what a row of data could look like
    //
    // TODO: Remove this
    callback && callback(null, [ // It just so happens that the row structure here is exactly the same as the ads product schema
        {
            // Required
            name: 'WebGL Game Development',
            description: 'WebGL, the web implementation of Open GL, is a JavaScript API used to render interactive 3D graphics within any compatible web browser, without the need for plugins. It helps you create detailed, high-quality graphical 3D objects easily. WebGL elements can be mixed with other HTML elements and composites to create high-quality, interactive, creative, innovative graphical 3D objects.\n\n' +
            'This book begins with collecting coins in Super Mario, killing soldiers in Contra, and then quickly evolves to working out strategies in World of Warcraft. You will be guided through creating animated characters, image processing, and adding effects as part of the web page canvas to the 2D/3D graphics. Pour life into your gaming characters and learn how to create special effects seen in the most powerful 3D games. Each chapter begins by showing you the underlying mathematics and its programmatic implementation, ending with the creation of a complete game scene to build a wonderful virtual world.\n\nISBN: 9781849699792',
            image_urls: [
                'http://www.packtpub.com/sites/default/files/9792OT_WebGL%20Game%20Development.jpg'
            ],
            price: 44.99,
            buy_url: "https://www.packtpub.com/game-development/webgl-game-development",

            // Optional
            external_id: "9792OT", // Your unique identifier that you reference the product as in your system
            sku: "16881", // If your product has a sku

            // currency: "USD",
            condition: "new",
            inline_buy_url: "https://www.packtpub.com/game-development/webgl-game-development?inline=1",
            // impression_url: "http://domain.com/path/to/impression/pixel", // If you have an impression pixel url, we want it

            tags: [ "WebGL", "Game Development", "HTML5", "Summet Arora", "Physics", "3D", "Graphics", "JavaScript", "Animation", "Paperback", "Book" ],
            category: [ 'Books', 'Game Development' ],

            manufacturer: "Packt Publishing",
            // upc: "",
            isbn: "9781849699792",

            sold_by: "Packt Publishing",

            // donation_percent: 0, // Does the sale of the item donate any percentage to a non-profit?
            // donation_to: "", // The name of the non-profit

            meta: {
                source: "okanjo-load",
                now: (new Date()).toUTCString(),
                answer: 42
            }

        }
    ]);

}


/**
 * This function takes product data "rows" and converts them into an Okanjo product.
 *
 * The majority of the heavy lifting and customization will likely need to be done here.
 *
 * @param {[*]} products - Array of product data rows
 * @param {function(err:Error, data:[*])} callback – Function called after the products have been uploaded
 */
function processAndLoadProducts(products, callback) {

    async.mapSeries(products, function(p, callback) {


        /********************************
         * TODO: CUSTOMIZE THIS SECTION *
         ********************************/

        //
        // Basic, required fields -------------------------------------------------------------------------------------
        //

        var productData = {
            name: p.name,
            description: p.description,
            image_urls: p.image_urls,
            price: p.price,
            buy_url: p.buy_url
        };

        //
        // Optional fields
        //

        if (p.external_id) {
            productData.external_id = p.external_id;
        }

        if (p.sku) {
            productData.sku = p.sku;
        }

        if (p.currency) {
            productData.currency = p.currency;
        }

        if (p.condition) {
            productData.condition = p.condition;
        }

        if (p.inline_buy_url) {
            productData.inline_buy_url = p.inline_buy_url;
        }

        if (p.impression_url) {
            productData.impression_url = p.impression_url;
        }

        if (p.tags) {
            productData.tags = p.tags;
        }

        if (p.category) {
            productData.category = p.category;
        }

        if (p.manufacturer) {
            productData.manufacturer = p.manufacturer;
        }

        if (p.upc) {
            productData.upc = p.upc;
        }

        if (p.isbn) {
            productData.isbn = p.isbn;
        }

        if (p.sold_by) {
            productData.sold_by = p.sold_by;
        }

        if (p.donation_percent && p.donation_to) {
            productData.donation_percent = p.donation_percent;
            productData.donation_to = p.donation_to;
        }

        if (p.meta) {
            productData.meta = p.meta;
        }


        (function(productData) {

            //
            // SEND TO OKANJO ---------------------------------------------------------------------------------
            //

            // IF YOU JUST WANT TO DEBUG:
            // * Uncomment the callback line below
            // * Comment-out the api.postProduct call

            // Just return the product for testing
//                    callback && callback(null, productData);

            // Post the product for REAL
            api.postMarketplaceProduct(config.ads.api.marketplace_id).data(productData).execute(function(err, res) {
                if (err) { callback && callback(err); return; }

                if (res.status == okanjo.common.Response.status.created) {
                    console.log(' > Uploaded product', res.data.id);
                    callback && callback(null, res.data);
                } else {
                    console.error('Failed to post product. Response:', res);
                    var error = new Error('Product posting failed');
                    error.response = res;
                    callback && callback(error);
                }
            });

        })(productData);

    }, function(err, okanjoProducts) {
        callback && callback(null, okanjoProducts);
    });

}


//
// DO THE IMPORT ------------------------------------------------------------------------------------------------------
//



var api = new okanjo.clients.AdsClient(config.ads.api);


// Watch the log event and handle notifications
//api.on('log', function(level, message, args) {
//    // You can filter out lower-level log events that you don't want to see
//    // See okanjo.Client.LogLevel for options
//    console.log('[' + (new Date()) + '] ' + level.name + ': ' + message, args);
//});


// Make sure that the marketplace_id matches the credentials of the key/secret
api.getMarketplaceById(config.ads.api.marketplace_id).execute(function(err, res) {
    if (err) { console.error(err); return; }
    if (res.status == okanjo.common.Response.status.ok) {

        getSourceProducts(function(err, data) {
            if (err) { console.error('Failed to retrieve source data', err); return; }

            processAndLoadProducts(data, function(err, products) {
                if (err) { console.error('Failed to map products', err); return; }

                console.log('COMPLETED OKANJO PRODUCTS:', products);
                console.log('DONE!');
                process.exit(0);

            });
        });

    } else {
        console.error('Your Okanjo Ads credentials are not quite right...', res);
    }
});