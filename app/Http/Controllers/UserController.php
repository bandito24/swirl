<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index(){
        $users = User::all();
        return response()->json($users);
    }
    public function checkVariable(Request $request){
        $checkCol =  $request['parameter'];
        $checkValue = $request['value'];
        if(DB::table('users')->where($checkCol, $checkValue)->exists()){
            return response('unavailable', 200);
        } else {
//            return response('unavailable', 200);
            return response('available', 200);
        }
    }
}
