<?php
define('CLIENT_ID' , 'david_delangel@toditopagos.com');
define('CLIENT_SECRET', '25fa41f05765b4e2674d86a1f440ff7f2e405374877bf994e0e919b691adc30a');
define('URL', 'https://webhook.site/73c4a7c7-0fa0-4fc2-aa14-9923933c4a49');

function curlCall($curlPostData) {
  $curlPostData['ADDRESS'] = (strlen($_SERVER['REMOTE_ADDR']) != 0) ? $_SERVER['REMOTE_ADDR'] : $_SERVER['HTTP_X_FORWARDED_FOR'];
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, 'https://www.toditocash.com/tpayQA/redirect.php');
  curl_setopt($ch, CURLOPT_USERPWD, CLIENT_ID.':'.CLIENT_SECRET);
  curl_setopt($ch, CURLOPT_TIMEOUT, 45);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($curlPostData));

  curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $result = curl_exec($ch);
  curl_close($ch);
  return $result;
}
?>

