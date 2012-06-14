_node -lp -v -f -c builtins._js
mv builtins.js ../callbacks

_node -lp -v -f --fibers -c builtins._js
cat builtins.js | sed -e "s/\/\/\/ \!doc//" > ../fibers/builtins.js
rm builtins.js

_node -lp -v -f --generators -c builtins._js
cat builtins.js | sed -e "s/\/\/\/ \!doc//" > ../generators/builtins.js
rm builtins.js

_node -lp -v -f -c compile._js
_node -lp -v -f -c ../streams/client/streams._js

# compile test files for client too
pushd ../../test/common > /dev/null
_node -lp -v -f -c .
mv eval-test.js flows-test.js stack-test.js futures-test.js callbacks
_node --generators -v -f -c .
mv eval-test.js flows-test.js stack-test.js futures-test.js generators
popd > /dev/null
