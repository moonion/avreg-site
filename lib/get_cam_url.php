<?php

$cams_subconf = load_profiles_cams_confs();

$__tmp = &$conf['avregd-httpd'];
eval("\$http_cam_location = \"$__tmp\";");
unset($__tmp);

function get_cam_http_url($conf, $cam_nr, $media, $append_abenc=false)
{
   $cams_subconf = &$GLOBALS['cams_subconf'];
   if ( $cams_subconf && isset($cams_subconf[$cam_nr])
        && !empty($cams_subconf[$cam_nr]['avregd-httpd'])) {
      $_a = &$cams_subconf[$cam_nr]['avregd-httpd'];
      eval("\$url = \"$_a\";");
   } else
      $url = $GLOBALS['http_cam_location'];

   $path_var = sprintf('avregd-%s-path', $media);
   if (isset($conf[$path_var]))
      $url .= sprintf("%s?camera=%d", $conf[$path_var], $cam_nr);
   if ($append_abenc && !empty($GLOBALS['user_info']['USER'])) {
      $url .= '&ab=' . base64_encode($GLOBALS['user_info']['USER'].':'.$_SERVER['PHP_AUTH_PW']);
   }
   return $url;
}
?>