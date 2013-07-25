<?php
/**
 * @file lang/russian/utf-8/_online.php
 * @brief Файл переводов для страниц
 * - online/index.php	
 * - online/build_mon.php
 * - online/view.php
 * - online/active_wc.inc.php
 */
/* ONLINE START ******************************/

$r_webcam_list = ' Видеокамеры,  разрешённые для просмотра<br>'.
'по протоколу HTTP (в интернет-браузерах).';
$strNotWebcamDef = 'Нет ни одной разрешённой для просмотра по протоколу HTTP (через интернет-браузер) видеокамеры. '.
'<br>Если просмотр необходим - обратитесь к администратору системы.';
$strShowCam = 'Показать изображение с выбранных видеокамер';
$WebCam = 'Веб-камеры';
$fmtActiveWEBCAMS='Всего сконфигурировано для просмотра по сети - %d вебкамер(ы).';
$srtNoActiveWEBCAMS='Инсталлятор или администратор системы<br> не настроил ни одной камеры для просмотра через браузер.';
$strWcMons='Доступные раскладки(планы) просмотра.';
$strWcMons2='Переход к выбору камер для конкретной раскладки по соответствующей ссылке.';
$strFitToScreen = 'Масштабировать на весь экран';
$strPrintCamNames='Выводить названия камер';
$strEnableReconnect='Пытаться востановить соединение при потере связи';
$WcListShow = array(
'не показывать',
'правильно сконфигурированные для просмотра по сети',
'все'
);

$strToolbarControls = array(
	'on'=>'Вывести панель управления', //'Зафиксировать панель управления',
	'off'=>'Скрыть панель управления', //'Снять фиксацию с панели управления',
	'stop'=>'Стоп',
	'play'=>'Старт',
	'zoom_in'=>'Увеличить',
	'zoom_out'=>'Уменьшить',
	'orig_size'=>'Оригинальный размер',
	'cell_size'=>'Вписать в ячейку',
	'to_cam_interface'=>'Перейти в веб интерфейс IP-камеры',
	'max'=>'Развернуть',
	'min'=>'К раскладке',
	'select_view'=>'Выбрать раскладку'
);

$strCamName_Yes = 'Да';
$strCamName_No = 'Нет';

$strAspectRatio = 'Пропорции';
$AspectRatioArray = array(
  'calc'=>'сохранять пропорции',
  'fs' => 'на весь экран',
);

$strReconnectTimeout = 'Интервал реконнекта';
$ReconnectTimeoutArray = array(
	'0'=>'без реконнекта',
	'3' => '3сек.',
	'5' => '5сек.',
	'10' => '10сек.',
	'15' => '15сек.'
);

$sWcDefLayout = 'Определите расположение камер в плане раскладки и нажмите кнопку &#171;Показать ...&#187;.<br>Обязательно определите камеру для главного окна раскладки,<br>выделенного рамкой другого цвета.';

/******************************** ONLINE END */

?>
