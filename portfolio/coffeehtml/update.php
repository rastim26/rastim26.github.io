<?php set_time_limit(0); ini_set('display_errors','Off'); echo '<script>history.back();</script>';

if(!extension_loaded('zip')){ echo('Error: ZIP extention not found, please, install!'); die; }
if(!extension_loaded('curl')){ echo('Error: CURL extention not found, please, install!'); die; }

if( isset($_GET['source']) ){

  $source_site = 'coffee-shop-f766d1';

  $source_path = dirname( $_GET['source'] );
  $source_file = $source_path.'/'.$source_site.'.zip';

  if( dirname(substr($source_path, strpos($source_path, 'webflow-converter.ru'))) === 'webflow-converter.ru' ){

    $output_file = basename($source_file);

    curl_download($source_file, $output_file);

    $zip = new ZipArchive;
    $zip->open($output_file);
    $zip->extractTo('./');
    $zip->close();

    unlink($output_file);

  }

}

function curl_download($url, $file) {
    $dest_file = @fopen($file, "w");
    $resource = curl_init();
    curl_setopt($resource, CURLOPT_URL, $url);
    curl_setopt($resource, CURLOPT_FILE, $dest_file);
    curl_setopt($resource, CURLOPT_HEADER, 0);
    curl_exec($resource);
    curl_close($resource);
    fclose($dest_file);
}