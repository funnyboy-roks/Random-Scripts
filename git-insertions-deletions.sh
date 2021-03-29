# ./<filename> [author] [branch]
git log --author=$1 --shortstat $2 | \
awk '/^ [0-9]/ { f += $1; i += $4; d += $6 } \
END { printf("%d files changed, %d insertions(+), %d deletions(-)", f, i, d) }'