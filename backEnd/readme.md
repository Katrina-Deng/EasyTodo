<!--
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-06-30 16:04:12
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-07 22:31:13
-->

# git

https://www.cnblogs.com/ivy-zheng/p/13098818.html

# koa-ts-controller

https://github.com/iyobo/amala#readme

# Sequelize CLI

https://sequelize.org/master/identifiers.html

Sequelize CLI [Node: 10.21.0, CLI: 6.0.0, ORM: 6.1.0]

sequelize <command>

Commands:
sequelize db:migrate Run pending migrations
sequelize db:migrate:schema:timestamps:add Update migration table to have timestamps
sequelize db:migrate:status List the status of all migrations
sequelize db:migrate:undo Reverts a migration
sequelize db:migrate:undo:all Revert all migrations ran
sequelize db:seed Run specified seeder
sequelize db:seed:undo Deletes data from the database
sequelize db:seed:all Run every seeder
sequelize db:seed:undo:all Deletes data from the database
sequelize db:create Create database specified by configuration
sequelize db:drop Drop database specified by configuration
sequelize init Initializes project
sequelize init:config Initializes configuration
sequelize init:migrations Initializes migrations
sequelize init:models Initializes models
sequelize init:seeders Initializes seeders
sequelize migration:generate Generates a new migration file [aliases: migration:create]
sequelize model:generate Generates a model and its migration [aliases: model:create]
sequelize seed:generate Generates a new seed file [aliases: seed:create]

Options:
--version Show version number [boolean]
--help Show help



## 附件上存

- koa-body

  [koabody](https://www.npmjs.com/package/koa-body)

  解析body 二进制文件 的koa 库。注意查看上存文件方面的配置。

  例如： Some options for formidable， Options

  ```
    app.use(
      koaBody({
        multipart: true,
        formidable: {
          keepExtensions: true,
          uploadDir: configs.storage.dir,
        },
      })
    );
  ```

- boardlistcard.ts

  添加文件接口。注意了除了提交file文件时候，还要提交boardlistcardId用作cardAttachment作卡和附件的关联

  ```ts
  public async uploadAttachment(@Ctx() ctx: Context, @Body() body: any) {
    	// 获取卡片的id  
      let { boardListCardId } = body;
      // 判断卡片存在？
      let card = await getAndVaildBoardListCardID(
        boardListCardId,
        ctx.userInfo.id
      );
      if (!ctx.request.files || !ctx.request.files.attachment) {
        throw boom.badData("缺少上存的文件");
      }
  	// ts 类型检测问题，要用json格式化一下不然会报错
      let tempFile = JSON.stringify(ctx.request.files.attachment);
      let file = JSON.parse(tempFile);
  
      let attachment = new Attachment();
      attachment.userId = ctx.userInfo.id;
      attachment.originName = file.name;
      attachment.name = file.path.split("\\").pop() as string;
      attachment.type = file.type;
      attachment.size = file.size;
      await attachment.save();
  
      let cardAttachment = new CardAttachment();
      cardAttachment.userId = ctx.userInfo.id;
      cardAttachment.boardListCardId = boardListCardId;
      cardAttachment.attachmentId = attachment.id;
      cardAttachment.isCover = false;
  
      await cardAttachment.save();
      // 返给前端的格式 attachments[]对象数组里面的信息格式
      return {
        id: cardAttachment.id,
        userId: ctx.userInfo.id,
        boardListCardId: boardListCardId,
        attachmentId: attachment.id,
        isCover: false,
        createdAt: cardAttachment.createdAt,
        updatedAt: cardAttachment.updatedAt,
        path: configs.storage.path + "/" + attachment.name,
        details: {
          id: attachment.id,
          userId: ctx.userInfo.id,
          originName: attachment.originName,
          name: attachment.name,
          type: attachment.type,
          size: attachment.size,
          createdAt: attachment.createdAt,
          updatedAt: attachment.updatedAt,
        },
      };
    }
  ```

  

