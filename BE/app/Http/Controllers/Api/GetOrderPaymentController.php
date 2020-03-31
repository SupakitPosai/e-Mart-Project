<?php

namespace App\Http\Controllers\Api;
use App\OrderProduct;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GetOrderPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        //$OrderProduct = OrderProduct::where('id_user','=', $request->id_user)->where('status' , '=','รอการชำระเงิน')->get();
        $OrderProduct = DB::table('order_product')
        ->join('payment_method', 'order_product.id_payment_method', '=', 'payment_method.id_payment_method') 
        ->where('id_user','=', $request->id_user)
        ->where('order_product.status' , '=','รอการชำระเงิน')    
        ->select('order_product.*','payment_method.name_payment_method'
        )->get();
        return $OrderProduct;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $users = DB::table('order_product')
        ->join('order_product_detail', 'order_product.id_order', '=', 'order_product_detail.id_order')    
        ->join('product','order_product_detail.id_product' , '=', 'product.id_product') 
        ->join('shop','shop.id_shop', '=',  'order_product_detail.id_shop')
        ->where('order_product.id_user','=', $request->id_user)    
        ->select('order_product.id_order','order_product.num_id','product.img_product','product.name_product',
         'order_product_detail.num','order_product_detail.price_product','order_product_detail.delivery_method',
         'order_product_detail.status_order_detail',
        'order_product_detail.total' ,'shop.name_shop','order_product_detail.property','order_product_detail.img_product1'
        )->get();
        
        return $users;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
