<?php
/**
 *
 * @file lib/grab_globals.lib.php
 * @brief Обеспечивает преобразование параметров запросов в переменные, используемые далее в скрипте
 *
 */

if (!defined('PMA_GRAB_GLOBALS_INCLUDED')) {
    define('PMA_GRAB_GLOBALS_INCLUDED', 1);

    if (!empty($_GET)) {
        extract($_GET, EXTR_OVERWRITE);
    } elseif (!empty($HTTP_GET_VARS)) {
        extract($HTTP_GET_VARS, EXTR_OVERWRITE);
    } // end if

    if (!empty($_POST)) {
        extract($_POST, EXTR_OVERWRITE);
    } elseif (!empty($HTTP_POST_VARS)) {
        extract($HTTP_POST_VARS, EXTR_OVERWRITE);
    } // end if

    if (!empty($_FILES)) {
        while (list($name, $value) = each($_FILES)) {
            $$name = $value['tmp_name'];
        }
    } elseif (!empty($HTTP_POST_FILES)) {
        while (list($name, $value) = each($HTTP_POST_FILES)) {
            $$name = $value['tmp_name'];
        }
    } // end if

    if (!empty($_SERVER) && isset($_SERVER['PHP_SELF'])) {
        $PHP_SELF = $_SERVER['PHP_SELF'];
    } elseif (!empty($HTTP_SERVER_VARS) && isset($HTTP_SERVER_VARS['PHP_SELF'])) {
        $PHP_SELF = $HTTP_SERVER_VARS['PHP_SELF'];
    } // end if

    // Securety fix: disallow accessing serious server files via "?goto="
    if (isset($goto) && strpos(' ' . $goto, '/') > 0 && substr($goto, 0, 2) != './') {
        unset($goto);
    } // end if

} // $__PMA_GRAB_GLOBALS_LIB__
