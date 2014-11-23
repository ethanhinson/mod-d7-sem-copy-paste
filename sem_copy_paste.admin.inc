<?php
/**
 * Admin form for SEM copy paste settings
 */
function sem_copy_paste_form_config($form, $form_state) {
  $form = array();
  $form['sem_cp_track'] = array(
    '#type' => 'checkbox',
    '#title' => t('Track Copy/Paste Behavior with Google Analytics Events'),
    '#description' => t('Requires Google Analytics module 2.x or higher.'),
    '#default_value' => variable_get('sem_cp_track', FALSE),
  );

  $form['sem_cp_append'] = array(
    '#type' => 'checkbox',
    '#title' => t('Append Attribution'),
    '#description' => t('Creates a link/url that is appended to any content copied from this website'),
    '#default_value' => variable_get('sem_cp_append', TRUE),
  );

  $form['sem_cp_attr_text'] = array(
    '#type' => 'textfield',
    '#title' => t('Attribution Text'),
    '#description' => t('A short snippet of text to add to any copied content. A link is also added with the above option selected. HTML is allowed. Please be brief.'),
    '#default_value' => variable_get('sem_cp_attr_text', ''),
  );

  $form['roles'] = array(
    '#type' => 'fieldset',
    '#title' => t('User Roles Settings'),
    '#collapsible' => TRUE,
    '#description' => t('Define which roles can copy and paste content without having the attribution string appended.'),
  );

  $user_roles = user_roles();
  $form['roles']['sem_cp_exempt_roles'] = array(
    '#type' => 'checkboxes',
    '#options' => drupal_map_assoc($user_roles),
    '#title' => t('Exempt Roles'),
    '#default_value' => variable_get('sem_cp_exempt_roles', array()),
  );

  drupal_set_title('SEM Friendly Copy/Paste Settings', PASS_THROUGH);

  return system_settings_form($form);
}