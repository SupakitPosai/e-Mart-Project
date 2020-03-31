<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::get('users', 'UsersController@index');
// Route::get('users/{id}', 'UsersController@show');
// Route::post('users', 'UsersController@store');
// Route::put('users/{id}', 'UsersController@update');
// Route::delete('users/{id}', 'UsersController@delete');


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('users','Api\UsersController');
Route::resource('type_product','Api\TypeProductController');
Route::resource('shop','Api\ShopController');
Route::resource('product','Api\ProductController');
Route::resource('deliveryMethod','Api\DeliveryMethodController');
Route::resource('cart','Api\CartController');
Route::resource('paymentMethod','Api\PaymentMethodController');
Route::resource('orderProduct','Api\OrderProductController');
Route::resource('orderProductDetail','Api\OrderProductDetailController');
Route::resource('getOrderPayment','Api\GetOrderPaymentController');
Route::resource('getOrderStatus','Api\GetOrderStatusController');
Route::resource('notifyPayment','Api\NotifyPaymentController');
Route::resource('payment','Api\PaymentController');
Route::resource('putOrder','Api\PutOrderController');
Route::resource('putOrderDetail','Api\PutOrderDetailController');
Route::resource('storage','Api\StorageController');
Route::resource('editshop','Api\EditShopController');
Route::resource('typeproperty','Api\TypePropertyController');
Route::resource('dePutCar','Api\DePutCarController');
Route::resource('property','Api\PropertyController');
Route::resource('follow','Api\FollowController');
Route::resource('social','Api\LoginSocialController');
Route::resource('banner','Api\BannerController');
Route::resource('search','Api\CartOrController');
Route::resource('count','Api\CountController');
// // Route::put('users/{id}','UsersController@update');