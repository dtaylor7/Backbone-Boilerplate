<?php

include('maptiler.php');


//init
$map_tiler = new MapTiler('Untitled-1.jpg', array(
  'tiles_path' => 'tiles/',
  'zoom_max' => 5
));
//execute
try {
  $map_tiler->process(true);
} catch (Exception $e) {
  echo $e->getMessage();
  echo $e->getTraceAsString();
}