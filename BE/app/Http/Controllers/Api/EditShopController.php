<?php

namespace App\Http\Controllers\Api;
use App\Shop;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EditShopController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $shop = Shop::find($request->id_shop);
        $shop->name_shop = $request->get('name_shop');
       
        $shop->save();


        return response()->json('Users Updated Successfully.');
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
        $shop = Shop::find($request->id_shop);
        
        $shop->address_shop = $request->get('address_shop');
     
        $shop->save();


        return response()->json('Users Updated Successfully.');
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
        $shop = Shop::find($id);
        
        $shop->tax_id = $request->get('tax_id');
      
        $shop->save();


        return response()->json('Users Updated Successfully.');
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
        $shop = Shop::find($id);
        
        $shop->tel_shop = $request->get('tel_shop');
      
        $shop->save();


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
    }
}
