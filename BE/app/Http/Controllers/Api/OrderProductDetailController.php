<?php

namespace App\Http\Controllers\Api;
use App\OrderProductDetail;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderProductDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = DB::table('order_product_detail')
        ->join('order_product', 'order_product_detail.id_order', '=', 'order_product.id_order')
        ->join('users', 'order_product.id_user', '=', 'users.id')
        ->join('product', 'order_product_detail.id_product', '=', 'product.id_product')
        
        ->where('order_product_detail.id_shop','=', $request->id_shop)
        ->select('order_product.id_order','product.id_product','product.img_product','product.name_product','order_product_detail.num','product.price_product'
        ,'.total','users.name_user','users.address_user','order_product_detail.delivery_method',
        'order_product_detail.status_order_detail','order_product_detail.property','order_product_detail.img_product1'
        ,'order_product_detail.add_send'
        // 'order_product_detail.num','order_product_detail.price_product',
        // 'order_product_detail.total' ,'shop.name_shop'
        )
        ->get();

        return $users;


        // $OrderProductDetail = OrderProductDetail::where('id_shop','=', $request->id_shop)->get();
        
        // return $OrderProductDetail;
        //
      
        // return response()->json('Users Updated Successfully.');
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
        $orderProductDetail = new OrderProductDetail();
        
        $orderProductDetail->id_order = $request->get('id_order');
        $orderProductDetail->id_product = $request->get('id_product');
        $orderProductDetail->id_shop = $request->get('id_shop');
        $orderProductDetail->price_product = $request->get('price_product');
        $orderProductDetail->num = $request->get('num');
        $orderProductDetail->total = $request->get('total');
        $orderProductDetail->delivery_method = $request->get('delivery_method');
        $orderProductDetail->property = $request->get('property');
        $orderProductDetail->img_product1 = $request->get('img_product1');
        $orderProductDetail->add_send = $request->get('add_send');
        $orderProductDetail->date_order = $request->get('date_order');
        $orderProductDetail->status_order_detail = "รอการชำระเงิน";
       

        $orderProductDetail->save();
        return $orderProductDetail;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,$id)
    {
        //
       // $OrderProductDetail = OrderProductDetail::where('id_order','=', $request->id_order)->get();
        $users = DB::table('product')
        ->join('order_product_detail', 'product.id_product', '=', 'order_product_detail.id_product')
        ->join('shop', 'order_product_detail.id_shop', '=', 'shop.id_shop')
        
        ->where('id_order','=', $request->id_order)
        ->select('product.img_product','product.name_product',
        'order_product_detail.num','order_product_detail.price_product',
        'order_product_detail.total' ,'shop.name_shop','order_product_detail.delivery_method'
        ,'order_product_detail.property','order_product_detail.img_product1')
        ->get();

      
    return $users;
        // return $OrderProductDetail;
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
        $OrderProductDetail =  OrderProductDetail::find($id);
        $OrderProductDetail->status_order_detail = "รอการจัดส่ง";
        
        $OrderProductDetail->save();


        return response()->json('Users Updated Successfully.');

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
        $OrderProductDetail =  OrderProductDetail::find($id);
        
        return $OrderProductDetail;
    }
}
