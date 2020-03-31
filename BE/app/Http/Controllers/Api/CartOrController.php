<?php

namespace App\Http\Controllers\Api;

use App\Users;
use App\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class CartOrController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //

        $search = $request->search;
        $min = $request->pricemin_product;
        $max = $request->pricemax_product;
        $orderbyprice = $request->orderbyprice;
        $orderbyname = $request->orderbyname;
        $type = $request->typeproduct;

        if ($type != '') {
            $Product = Product::where('id_type_product', '=', $type)
                ->where('name_product', 'like', '%' . $search . '%')->get();
        } else {
            $Product = Product::where('name_product', 'like', '%' . $search . '%')->get();
        }


        return $Product;
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
        $search = $request->search;
        $min = $request->pricemin_product;
        $max = $request->pricemax_product;
        $orderbyprice = $request->orderbyprice;
        $orderbyname = $request->orderbyname;
        $type = $request->typeproduct;
        if ($type != '') {
            if ($orderbyprice != '') {
                $Product = Product::where('id_type_product', '=', $type)
                    ->where('name_product', 'like', '%' . $search . '%')
                    ->where('price_product', '>=', $min)
                    ->where('price_product', '<=', $max)
                    ->orderBy('price_product', $orderbyprice)
                    ->get();
            } else {
                if ($orderbyname != '') {
                    $Product = Product::where('id_type_product', '=', $type)
                        ->where('name_product', 'like', '%' . $search . '%')
                        ->where('price_product', '>=', $min)
                        ->where('price_product', '<=', $max)
                        ->orderBy('name_product', $orderbyname)
                        ->get();
                } else {
                    $Product = Product::where('id_type_product', '=', $type)
                        ->where('name_product', 'like', '%' . $search . '%')
                        ->where('price_product', '>=', $min)
                        ->where('price_product', '<=', $max)
                        ->get();
                }
            }
        } else {
            if ($orderbyprice != '') {
                $Product = Product::where('name_product', 'like', '%' . $search . '%')
                    ->where('price_product', '>=', $min)
                    ->where('price_product', '<=', $max)
                    ->orderBy('price_product', $orderbyprice)
                    ->get();
            } else {
                if ($orderbyname != '') {
                    $Product = Product::where('name_product', 'like', '%' . $search . '%')
                        ->where('price_product', '>=', $min)
                        ->where('price_product', '<=', $max)
                        ->orderBy('name_product', $orderbyname)
                        ->get();
                } else {
                    $Product = Product::where('name_product', 'like', '%' . $search . '%')
                        ->where('price_product', '>=', $min)
                        ->where('price_product', '<=', $max)
                        ->get();
                }
            }
        }


        return $Product;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        //
        $search = $request->search;
        $min = $request->pricemin_product;
        $max = $request->pricemax_product;
        $orderbyprice = $request->orderbyprice;
        $orderbyname = $request->orderbyname;
        $type = $request->typeproduct;
        if ($type != '') {
            if ($orderbyprice != '') {
                if ($min != '' && $max != '') {
                    $Product = Product::where('id_type_product', '=', $type)
                        ->where('name_product', 'like', '%' . $search . '%')
                        ->where('price_product', '>=', $min)
                        ->where('price_product', '<=', $max)
                        ->orderBy('price_product', $orderbyprice)
                        ->get();
                } else {
                    $Product = Product::where('id_type_product', '=', $type)
                        ->where('name_product', 'like', '%' . $search . '%')
                        ->orderBy('price_product', $orderbyprice)
                        ->get();
                }
            } else if ($orderbyname != '') {
                if ($min != '' && $max != '') {
                    $Product = Product::where('id_type_product', '=', $type)
                        ->where('name_product', 'like', '%' . $search . '%')
                        ->where('price_product', '>=', $min)
                        ->where('price_product', '<=', $max)
                        ->orderBy('price_product', $orderbyname)
                        ->get();
                } else {
                    $Product = Product::where('id_type_product', '=', $type)
                        ->where('name_product', 'like', '%' . $search . '%')
                        ->orderBy('price_product', $orderbyname)
                        ->get();
                }
            }
        } else {
            if ($orderbyprice != '') {
                if ($min != '' && $max != '') {
                    $Product = Product::where('name_product', 'like', '%' . $search . '%')
                        ->where('price_product', '>=', $min)
                        ->where('price_product', '<=', $max)
                        ->orderBy('price_product', $orderbyprice)
                        ->get();
                } else {
                    $Product = Product::where('name_product', 'like', '%' . $search . '%')
                        ->orderBy('price_product', $orderbyprice)
                        ->get();
                }
            } else if ($orderbyname != '') {
                if ($min != '' && $max != '') {
                    $Product = Product::where('name_product', 'like', '%' . $search . '%')
                        ->where('price_product', '>=', $min)
                        ->where('price_product', '<=', $max)
                        ->orderBy('price_product', $orderbyname)
                        ->get();
                } else {
                    $Product = Product::where('name_product', 'like', '%' . $search . '%')
                        ->orderBy('price_product', $orderbyname)
                        ->get();
                }
            }
        }


        return $Product;
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
        $users = DB::table('product') 
        ->join('type_product', 'product.id_type_product', '=', 'type_product.id_type')         
        ->where('product.id_shop','=', $request->id_shop)->where('product.status_product','=', 'มีสินค้า')
        ->select('type_product.id_type','type_product.name_type','type_product.img_type')
        ->distinct('type_product.id_type_product')
        ->get();
        //
        return $users;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,$id)
    {
        //
        $users = DB::table('product')      
        ->where('product.id_shop','=', $request->id_shop)
        ->where('product.id_type_product','=', $request->id_type)
        ->where('product.status_product','=', 'มีสินค้า')
        ->select('product.*')        
        ->get();
        //
        return $users;
    }
}
