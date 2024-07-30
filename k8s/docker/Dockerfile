FROM dhub.kubesre.xyz/nginx:1.12.2-alpine
ADD ROOT.tar.gz /root/app
ADD root.conf /usr/local/nginx/conf
CMD ["nginx", "-g", "daemon off;"]