xinput test $1|sed -une '/release/ {      x
     /^$/ s/^.*$/1/
     G
     h
     s/^/      /
     s/^ *\(......\)\n/\1  /p
     x
     s/\n.*$//
     /^9*$/ s/^/0/
     s/.9*$/x&/
     h
     s/^.*x//
     y/0123456789/1234567890/
     x
     s/x.*$//
     G
     s/\n//
     h
}'
