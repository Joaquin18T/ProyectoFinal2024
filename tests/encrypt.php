<?php

//echo password_hash("ana2024", PASSWORD_BCRYPT);


if(password_verify("ana2024", '$2y$10$M9oVu51MvWQfjA0Lr6lRZOqHK3lWlz9SPMT/FvG8UfkezBctOpWNK')){
  echo "ta bien";
}else{
  echo 'ta mal';
}
