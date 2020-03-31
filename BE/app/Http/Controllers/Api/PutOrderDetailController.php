<?php

namespace App\Http\Controllers\Api;
use App\OrderProductDetail1;
use App\OrderProduct;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PutOrderDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $OrderProductDetail = OrderProductDetail1::where('id_order','=',$request->id_order)->
        where('id_product','=',$request->id_product)->first();
        $OrderProductDetail->date_delivery = $request->get('date_delivery');
        $OrderProductDetail->track_num = $request->get('track_num');
        $OrderProductDetail->status_order_detail = 'จัดส่งสินค้าแล้ว';   
        $OrderProductDetail->save();

        $OrderProduct =  OrderProduct::where('id_order','=',$request->id_order)->first();
        $OrderProduct->status = "จัดส่งสินค้าแล้ว";
        
        $OrderProduct->save();

        return $OrderProductDetail;
        // return response()->json('Users Updated Successfully.');

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
