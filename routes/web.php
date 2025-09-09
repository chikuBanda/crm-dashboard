<?php

use App\Http\Controllers\QuoteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('dashboard/leads', [QuoteController::class, 'list'])->name('lead_list');

Route::get('dashboard/lead/{quote}', [QuoteController::class, 'show'])->name('lead_details');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
