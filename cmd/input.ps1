#input query instead of 'here'
node ..\src\app.js "#1, type RSDSHORT, value: 22                                                                                                                                                                                   4        17:40:37.492 14-09-2022   RsdCmdSp.cpp (line 1561)
RSDODBC               Parameter\Input                         #2, type RSDSHORT, value: 22                                                                                                                                                                                   4        17:40:37.492 14-09-2022   RsdCmdSp.cpp (line 1561)
RSDODBC               Parameter\Input                         #3, type RSDLPSTR, value:                                                                                                                                                                                      4        17:40:37.492 14-09-2022   RsdCmdSp.cpp (line 1641)
RSDODBC               Parameter\Input                         #4, type RSDLPSTR, value:                                                                                                                                           4        17:40:37.492 14-09-2022   RsdCmdSp.cpp (line 1641)
RSDODBC               SQL\Execute                             SELECT /*+FIRST_ROWS */ t.t_inumtype, t.t_type_account, t.t_name_type, t.t_contens FROM dtypeac_dbt t WHERE  (t.t_inumtype BETWEEN ? AND ?  AND t.t_name_type BETWEEN ? AND ? ) ORDER BY t.t_inumtype, t       1        17:40:37.492 14-09-2022   RSDCommandO.cpp (line 610)
                                                              .t_name_type, t.t_type_account"
															  
pause