/*** Generated by streamline --lines-mark 0.1.3e - DO NOT EDIT ***/

var __global = typeof global !== 'undefined' ? global : window;
function __cb(_, self, fn){ var ctx = __global.__context; return function(err, result){ __global.__context = ctx; if (err) return _.call(self, err); return fn.call(self, null, result); } }
function __throw(err){ if (err) throw err; }
/*     1 */ var fs = require("fs");
/*    23 */ var flows = require("streamline").flows;
/*    25 */ var fileFunnel = flows.funnel(20);
/*    27 */ function du(_, path) {
              var __ = (_ = (_ || __throw));
/*    28 */   var total = 0;
/*    29 */   return fs.stat(path, __cb(_, this, function(__0, stat) {
                return (function(__) {
/*    30 */       if (stat.isFile()) {
/*    31 */         return fileFunnel.channel(__cb(_, this, __), function(_) {
                      var __ = (_ = (_ || __throw));
/*    32 */           return fs.readFile(path, __cb(_, this, function(__0, __1) {
/*    32 */             total += __1.length;
                        return __();
                      }));
                    });
                  }
                   else {
/*    36 */         if (stat.isDirectory()) {
/*    37 */           return fs.readdir(path, __cb(_, this, function(__0, files) {
/*    42 */             return flows.spray(files.map(function(file) {
/*    39 */               return function(_) {
                            var __ = (_ = (_ || __throw));
/*    40 */                 return du(__cb(_, this, function(__0, __1) {
/*    40 */                   total += __1;
                              return __();
/*    40 */                 }), ((path + "/") + file));
                          };
/*    42 */             })).collectAll(__cb(_, this, function() {
/*    43 */               console.log(((path + ": ") + total));
                          return __();
                        }));
                      }));
                    }
/*    45 */          else {
/*    46 */           console.log((path + ": odd file"));
                    }
                  ;
                    return __();
                  }
                ;
                }).call(this, function() {
/*    48 */       return _(null, total);
                });
              }));
            };
/*    51 */ var p = ((process.argv.length > 2) ? process.argv[2] : ".");
/*    53 */ var t0 = Date.now();
/*    54 */ function report(err, result) {
/*    55 */   if (err) {
/*    56 */     console.log(((err.toString() + "\n") + err.stack));
              };
/*    57 */   console.log((("completed in " + ((Date.now() - t0))) + " ms"));
            };
/*    59 */ du(report, p);
