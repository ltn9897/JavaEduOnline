USE [master]
GO
/****** Object:  Database [EduOnline]    Script Date: 3/14/2022 7:03:54 PM ******/
CREATE DATABASE [EduOnline]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'EduOnline', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLSERVER\MSSQL\DATA\EduOnline.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'EduOnline_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLSERVER\MSSQL\DATA\EduOnline_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [EduOnline] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [EduOnline].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [EduOnline] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [EduOnline] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [EduOnline] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [EduOnline] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [EduOnline] SET ARITHABORT OFF 
GO
ALTER DATABASE [EduOnline] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [EduOnline] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [EduOnline] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [EduOnline] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [EduOnline] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [EduOnline] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [EduOnline] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [EduOnline] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [EduOnline] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [EduOnline] SET  ENABLE_BROKER 
GO
ALTER DATABASE [EduOnline] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [EduOnline] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [EduOnline] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [EduOnline] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [EduOnline] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [EduOnline] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [EduOnline] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [EduOnline] SET RECOVERY FULL 
GO
ALTER DATABASE [EduOnline] SET  MULTI_USER 
GO
ALTER DATABASE [EduOnline] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [EduOnline] SET DB_CHAINING OFF 
GO
ALTER DATABASE [EduOnline] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [EduOnline] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [EduOnline] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [EduOnline] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'EduOnline', N'ON'
GO
ALTER DATABASE [EduOnline] SET QUERY_STORE = OFF
GO
USE [EduOnline]
GO
/****** Object:  Table [dbo].[AppRole]    Script Date: 3/14/2022 7:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AppRole](
	[id] [bigint] NOT NULL,
	[name] [varchar](50) NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AppUser]    Script Date: 3/14/2022 7:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AppUser](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[password] [varchar](200) NOT NULL,
	[fullname] [varchar](100) NULL,
	[address] [varchar](200) NULL,
	[email] [varchar](100) NOT NULL,
	[avatar_image] [text] NULL,
	[phone] [varchar](12) NULL,
	[enabled] [bit] NULL,
	[role_id] [bigint] NULL,
	[created_date] [datetime] NULL,
	[updated_date] [datetime] NULL,
	[deleted_date] [datetime] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Catalog]    Script Date: 3/14/2022 7:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Catalog](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [varchar](255) NULL,
	[description] [text] NULL,
	[created_date] [datetime] NULL,
	[updated_date] [datetime] NULL,
	[deleted_date] [datetime] NULL,
 CONSTRAINT [PK_Catalog] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Conversation]    Script Date: 3/14/2022 7:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Conversation](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[user_id_one] [bigint] NULL,
	[user_id_two] [bigint] NULL,
	[created_date] [datetime] NULL,
	[updated_date] [datetime] NULL,
	[deleted_date] [datetime] NULL,
 CONSTRAINT [PK_Messages] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Course]    Script Date: 3/14/2022 7:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Course](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[subcatalog_id] [bigint] NULL,
	[title] [varchar](255) NULL,
	[short_description] [text] NULL,
	[description] [text] NULL,
	[requirement] [text] NULL,
	[who_this_course_is_for] [text] NULL,
	[what_you_will_learn] [text] NULL,
	[update_date] [date] NULL,
	[activate] [bit] NULL,
	[price] [decimal](18, 0) NULL,
	[video_duration] [varchar](50) NULL,
	[language] [varchar](10) NULL,
	[url_video_description] [varchar](255) NULL,
	[image_video_description] [varchar](255) NULL,
	[created_date] [datetime] NULL,
	[updated_date] [datetime] NULL,
	[deleted_date] [datetime] NULL,
 CONSTRAINT [PK_Course] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Feedback]    Script Date: 3/14/2022 7:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Feedback](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[course_id] [bigint] NULL,
	[customer_id] [bigint] NULL,
	[score] [varchar](10) NULL,
	[comment] [text] NULL,
	[created_date] [datetime] NULL,
	[updated_date] [datetime] NULL,
	[deleted_date] [datetime] NULL,
 CONSTRAINT [PK_Feedback] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Lecture]    Script Date: 3/14/2022 7:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Lecture](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[lesson_id] [bigint] NULL,
	[title] [varchar](255) NULL,
	[sort] [int] NULL,
	[video_url] [varchar](255) NULL,
	[video_duration] [varchar](50) NULL,
	[preview] [bit] NULL,
	[created_date] [datetime] NULL,
	[updated_date] [datetime] NULL,
	[deleted_date] [datetime] NULL,
 CONSTRAINT [PK_ContentLesson] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Lesson]    Script Date: 3/14/2022 7:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Lesson](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[course_id] [bigint] NULL,
	[title] [varchar](255) NULL,
	[created_date] [datetime] NULL,
	[updated_date] [datetime] NULL,
	[deleted_date] [datetime] NULL,
 CONSTRAINT [PK_Lession] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Messages]    Script Date: 3/14/2022 7:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Messages](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[user_id] [bigint] NULL,
	[conversation_id] [bigint] NULL,
	[message] [text] NULL,
	[responsed] [bit] NULL,
	[created_date] [datetime] NULL,
	[updated_date] [datetime] NULL,
	[deleted_date] [datetime] NULL,
 CONSTRAINT [PK_Messages_1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderDetail]    Script Date: 3/14/2022 7:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetail](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[course_id] [bigint] NULL,
	[order_id] [bigint] NULL,
	[created_date] [datetime] NULL,
	[updated_date] [datetime] NULL,
	[deleted_date] [datetime] NULL,
 CONSTRAINT [PK_OrderDetail] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 3/14/2022 7:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[id] [bigint] IDENTITY(100,1) NOT NULL,
	[order_number] [char](12) NULL,
	[customer_id] [bigint] NULL,
	[payment_id] [bigint] NULL,
	[total_amount] [decimal](18, 0) NULL,
	[status_order] [bit] NULL,
	[date_order] [date] NULL,
	[created_date] [datetime] NULL,
	[updated_date] [datetime] NULL,
	[deleted_date] [datetime] NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment]    Script Date: 3/14/2022 7:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[user_id] [bigint] NULL,
	[order_id] [varchar](50) NULL,
	[amount] [decimal](18, 0) NULL,
	[date_payment] [date] NULL,
	[status] [bit] NULL,
	[created_date] [datetime] NULL,
	[updated_date] [datetime] NULL,
	[deleted_date] [datetime] NULL,
 CONSTRAINT [PK_Payment] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Review]    Script Date: 3/14/2022 7:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Review](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[ratting] [float] NULL,
	[feedback] [varchar](255) NULL,
	[customer_id] [bigint] NULL,
	[course_id] [bigint] NULL,
	[created_date] [datetime] NULL,
	[updated_date] [datetime] NULL,
	[deleted_date] [datetime] NULL,
 CONSTRAINT [PK_Review] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SavedCourse]    Script Date: 3/14/2022 7:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SavedCourse](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[course_id] [bigint] NULL,
	[user_id] [bigint] NULL,
	[created_date] [datetime] NULL,
	[updated_date] [datetime] NULL,
	[deleted_date] [datetime] NULL,
 CONSTRAINT [PK_SavedCourse] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SubCatalog]    Script Date: 3/14/2022 7:03:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubCatalog](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[catalog_id] [bigint] NULL,
	[name] [varchar](255) NULL,
	[description] [text] NULL,
	[created_date] [datetime] NULL,
	[updated_date] [datetime] NULL,
	[deleted_date] [datetime] NULL,
 CONSTRAINT [PK_SubCatalog] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[AppRole] ([id], [name]) VALUES (1, N'ROLE_ADMIN')
INSERT [dbo].[AppRole] ([id], [name]) VALUES (2, N'ROLE_USER')
GO
SET IDENTITY_INSERT [dbo].[AppUser] ON 

INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (1, N'admin', N'$2a$10$BpCXNzHJ2lP0DAR3Sr2dFe1P1EOY5Hx.kcYk5lKA7hg693Qj7Vpzy', N'Admin', N'HCM', N'admin@gmail.com', N'http://localhost:8080/images/admin.png', N'12321', 1, 1, CAST(N'2021-12-28T18:27:46.737' AS DateTime), CAST(N'2022-03-13T02:12:01.787' AS DateTime), NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (2, N'user', N'$2a$10$2PLf9/zdqYYGyDWFTxJCquKhTaqW43qRdNRPegHqEvDm/79o65y0a', N'User', N'HCM', N'user@gmail.com', N'http://localhost:8080/images/user.png', N'0123456', 1, 2, CAST(N'2022-01-19T00:05:28.117' AS DateTime), CAST(N'2022-03-13T02:04:16.280' AS DateTime), NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (6, N'user1', N'$2a$10$2av9ql9cfx0tru2k7lS43.bJryGN7APP1naCZTYV58dhI2zDlLEBi', N'Lam', N'thai binh', N'user1@gmail.com', N'https://i.pinimg.com/originals/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg', N'012453245', 1, 2, CAST(N'2022-01-19T00:05:28.117' AS DateTime), NULL, CAST(N'2022-01-21T23:27:07.407' AS DateTime))
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (7, N'user2', N'$2a$10$wQxmDIJ6dkJU.NqzmNu8kOh.unlHx.prig53U8nUjQiaVH/s59NvG', N'Lam', N'HCM', N'user2@gmail.com', N'https://i.pinimg.com/originals/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg', N'0123456', 1, 2, CAST(N'2022-01-19T00:20:05.103' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (8, N'user3', N'$2a$10$l/zYhJaY68.JXUcLl6hy8ebQOrpOuSvyimAiky95j8z21R.3/m6Tu', N'Lam', N'HCM', N'user3@gmail.com', N'https://i.pinimg.com/originals/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg', N'012453245', 1, 2, CAST(N'2022-01-19T00:26:29.327' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (9, N'user4', N'$2a$10$JoZ/5BiWPsS3u9XzFBWdQOsFqrpHNIa89yHgAqAmg3ar2v.hLB0rG', N'Lam', N'HCM', N'user4@gmail.com', N'https://i.pinimg.com/originals/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg', NULL, 1, 2, CAST(N'2022-02-25T23:45:23.113' AS DateTime), CAST(N'2022-03-08T21:04:29.260' AS DateTime), NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (10, N'newTest', N'$2a$10$gjmLDLwrsnr0jhDhcRmifuiv8HD9VPBNoIICxAHkwys/5xdCSCsDS', N'newTestName', N'HCM', N'newgmail', N'https://i.pinimg.com/originals/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg', N'0123123132', 1, 2, CAST(N'2022-03-02T14:34:27.517' AS DateTime), CAST(N'2022-03-08T21:04:21.027' AS DateTime), CAST(N'2022-03-08T21:04:21.023' AS DateTime))
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (11, N'newTest1', N'$2a$10$.DOn4tsfuDeOvvjVYYJa3.VHXmU43k/K7.ThKLE32fySNLcxwL1j6', N'aaaaaaaaaaaaaaaa', N'HCM', N'newgmai1l', N'https://www.vectorstock.com/royalty-free-vector/flat-business-man-user-profile-avatar-icon-vector-4333097', NULL, 0, 2, CAST(N'2022-03-02T14:34:50.007' AS DateTime), CAST(N'2022-03-02T19:17:38.337' AS DateTime), CAST(N'2022-03-02T19:17:38.337' AS DateTime))
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (12, N'dwhotton0', N'DG1lebtk', N'Dieter Whotton', N'1 Corscot Place', N'dwhotton0@spotify.com', N'http://dummyimage.com/234x100.png/ff4444/ffffff', N'571-482-4027', 1, 2, CAST(N'2021-07-05T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (13, N'ghaizelden1', N'u2g1VKaPKkzM', N'Gertruda Haizelden', N'94 Haas Park', N'ghaizelden1@a8.net', N'http://dummyimage.com/123x100.png/ff4444/ffffff', N'128-548-0774', 1, 2, CAST(N'2022-01-20T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (14, N'cpirozzi2', N'W2lTcAf', N'Carolyn Pirozzi', N'0298 Barby Junction', N'cpirozzi2@smugmug.com', N'http://dummyimage.com/243x100.png/ff4444/ffffff', N'222-379-4610', 1, 2, CAST(N'2021-12-29T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (15, N'ehinder3', N'0HEmVbZlgK', N'Edgard Hinder', N'9 Dakota Drive', N'ehinder3@hud.gov', N'http://dummyimage.com/219x100.png/ff4444/ffffff', N'629-188-5349', 1, 2, CAST(N'2021-06-26T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (16, N'jcalwell4', N'kOFTJgfGW', N'Julian Calwell', N'7 Talisman Road', N'jcalwell4@europa.eu', N'http://dummyimage.com/137x100.png/ff4444/ffffff', N'757-515-7714', 1, 2, CAST(N'2022-01-17T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (17, N'kshovelton5', N'Cnw9yyO76F', N'Katharine Shovelton', N'38755 Evergreen Circle', N'kshovelton5@ebay.co.uk', N'http://dummyimage.com/147x100.png/cc0000/ffffff', N'350-162-5990', 1, 2, CAST(N'2021-11-11T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (18, N'kboltwood6', N'ZOhmI5A2DTz8', N'Kelby Boltwood', N'709 Mockingbird Place', N'kboltwood6@buzzfeed.com', N'http://dummyimage.com/125x100.png/cc0000/ffffff', N'174-707-0226', 1, 2, CAST(N'2021-05-21T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (19, N'ascupham7', N'Yz1DMvCtUarY', N'Anne Scupham', N'093 Shasta Alley', N'ascupham7@technorati.com', N'http://dummyimage.com/149x100.png/dddddd/000000', N'552-884-1802', 1, 2, CAST(N'2021-07-09T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (20, N'lmordey8', N'ARXKOL4yEl', N'Lisabeth Mordey', N'6644 Park Meadow Plaza', N'lmordey8@elpais.com', N'http://dummyimage.com/155x100.png/ff4444/ffffff', N'327-258-8667', 1, 2, CAST(N'2021-04-21T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (21, N'jjacketts9', N'X9dymegV', N'Jaquelyn Jacketts', N'9185 Hermina Way', N'jjacketts9@1und1.de', N'http://dummyimage.com/192x100.png/ff4444/ffffff', N'582-853-4674', 1, 2, CAST(N'2021-12-02T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (22, N'skubasa', N'oaHHeU8NrpE', N'Sully Kubas', N'544 Delladonna Avenue', N'skubasa@state.tx.us', N'http://dummyimage.com/103x100.png/5fa2dd/ffffff', N'229-440-8706', 1, 2, CAST(N'2021-11-07T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (23, N'bstollwerckb', N'k58A5aKC', N'Barron Stollwerck', N'27998 Hovde Road', N'bstollwerckb@xrea.com', N'http://dummyimage.com/178x100.png/5fa2dd/ffffff', N'441-810-4651', 1, 2, CAST(N'2021-11-16T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (24, N'bmatteuzzic', N'vgxI5V0', N'Barry Matteuzzi', N'4055 Northview Terrace', N'bmatteuzzic@washingtonpost.com', N'http://dummyimage.com/204x100.png/cc0000/ffffff', N'353-938-7065', 1, 2, CAST(N'2021-07-08T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (25, N'kgulld', N'ScaCgNGEv9', N'Konrad Gull', N'422 Grim Terrace', N'kgulld@cbslocal.com', N'http://dummyimage.com/157x100.png/5fa2dd/ffffff', N'554-586-4047', 1, 2, CAST(N'2021-07-16T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (26, N'pmaccolgane', N'c6kI7VI0Y5kj', N'Penny MacColgan', N'5579 Warrior Alley', N'pmaccolgane@taobao.com', N'http://dummyimage.com/182x100.png/cc0000/ffffff', N'796-745-1086', 1, 2, CAST(N'2021-11-26T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (27, N'lroebottomf', N'9gQNefQ4o', N'Lin Roebottom', N'83657 Boyd Avenue', N'lroebottomf@storify.com', N'http://dummyimage.com/127x100.png/5fa2dd/ffffff', N'499-886-9939', 1, 2, CAST(N'2021-12-26T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (28, N'wbalmadierg', N'LD7XyfbQ', N'Winnah Balmadier', N'78 Blackbird Terrace', N'wbalmadierg@unicef.org', N'http://dummyimage.com/228x100.png/dddddd/000000', N'354-104-4081', 1, 2, CAST(N'2021-08-14T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (29, N'qconnechyh', N'sR6fOzs4', N'Quint Connechy', N'9 Barnett Pass', N'qconnechyh@bandcamp.com', N'http://dummyimage.com/209x100.png/ff4444/ffffff', N'608-471-0381', 1, 2, CAST(N'2022-02-12T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (30, N'tethelstoni', N'F6My0RZ', N'Tove Ethelston', N'284 Spenser Street', N'tethelstoni@ucla.edu', N'http://dummyimage.com/195x100.png/ff4444/ffffff', N'892-948-0806', 1, 2, CAST(N'2021-03-29T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (31, N'ggruszkaj', N'7G3mYvlZ', N'Germain Gruszka', N'02843 Bultman Center', N'ggruszkaj@mysql.com', N'http://dummyimage.com/178x100.png/5fa2dd/ffffff', N'954-330-5277', 1, 2, CAST(N'2021-12-16T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (32, N'odmitrk', N'L0Lop5aTwvDv', N'Olag Dmitr', N'83237 Logan Hill', N'odmitrk@github.io', N'http://dummyimage.com/154x100.png/cc0000/ffffff', N'469-366-4075', 1, 2, CAST(N'2021-10-10T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (33, N'bcrinagel', N'iZYZcn0st4W', N'Bryana Crinage', N'0010 Becker Pass', N'bcrinagel@hexun.com', N'http://dummyimage.com/155x100.png/dddddd/000000', N'910-856-2324', 1, 2, CAST(N'2021-08-26T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (34, N'apartenerm', N'MWPaMM0', N'Ammamaria Partener', N'260 Village Place', N'apartenerm@ustream.tv', N'http://dummyimage.com/149x100.png/cc0000/ffffff', N'989-412-0564', 1, 2, CAST(N'2021-10-12T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (35, N'nfrickn', N'm0vGdz', N'Nessy Frick', N'42 Valley Edge Drive', N'nfrickn@weebly.com', N'http://dummyimage.com/142x100.png/dddddd/000000', N'977-782-8956', 1, 2, CAST(N'2021-09-25T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (36, N'kduckinfieldo', N'Ww54wGB', N'Kippie Duckinfield', N'674 Hoffman Way', N'kduckinfieldo@qq.com', N'http://dummyimage.com/182x100.png/dddddd/000000', N'509-614-9236', 1, 2, CAST(N'2021-03-28T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (37, N'ibiskupiakp', N'0XWUQU', N'Israel Biskupiak', N'53563 Sutherland Road', N'ibiskupiakp@sun.com', N'http://dummyimage.com/183x100.png/cc0000/ffffff', N'702-533-8992', 1, 2, CAST(N'2021-10-27T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (38, N'kmyottq', N'EXsJ2kj', N'Katrinka Myott', N'657 Westport Alley', N'kmyottq@prnewswire.com', N'http://dummyimage.com/199x100.png/5fa2dd/ffffff', N'467-240-1936', 1, 2, CAST(N'2022-01-10T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (39, N'dcracknellr', N'czbDNLgVtfDb', N'Delaney Cracknell', N'519 Doe Crossing Point', N'dcracknellr@typepad.com', N'http://dummyimage.com/123x100.png/cc0000/ffffff', N'674-896-4662', 1, 2, CAST(N'2021-11-18T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (40, N'dpearcys', N'9CWxjtxeO', N'Domenico Pearcy', N'329 Goodland Junction', N'dpearcys@house.gov', N'http://dummyimage.com/146x100.png/5fa2dd/ffffff', N'808-306-0688', 1, 2, CAST(N'2021-09-30T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (41, N'abasilonet', N'6SgMKxS', N'Addi Basilone', N'26 Tennessee Pass', N'abasilonet@tmall.com', N'http://dummyimage.com/224x100.png/cc0000/ffffff', N'257-191-1328', 1, 2, CAST(N'2021-04-19T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (42, N'sdiu', N'KGdUdQFU', N'Sheelah Di Bartolomeo', N'3662 Kinsman Street', N'sdiu@moonfruit.com', N'http://dummyimage.com/202x100.png/5fa2dd/ffffff', N'955-792-9148', 1, 2, CAST(N'2022-01-21T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (43, N'cbloorev', N'go97jR81', N'Cort Bloore', N'4 Grim Point', N'cbloorev@netscape.com', N'http://dummyimage.com/115x100.png/ff4444/ffffff', N'209-263-2022', 1, 2, CAST(N'2021-11-19T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (44, N'bshrievew', N'O1hLb0', N'Birgit Shrieve', N'55 Daystar Place', N'bshrievew@printfriendly.com', N'http://dummyimage.com/122x100.png/5fa2dd/ffffff', N'729-932-8844', 1, 2, CAST(N'2021-10-19T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (45, N'afrancex', N'TH3RFGQT', N'Adelbert France', N'37074 Kropf Road', N'afrancex@hugedomains.com', N'http://dummyimage.com/101x100.png/dddddd/000000', N'561-901-0484', 1, 2, CAST(N'2022-02-24T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (46, N'dhymany', N'eHCmpiJi3', N'Delora Hyman', N'43 Bonner Lane', N'dhymany@oaic.gov.au', N'http://dummyimage.com/171x100.png/dddddd/000000', N'988-833-8715', 1, 2, CAST(N'2021-12-13T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (47, N'nconninghamz', N'pW1pSxpsS', N'Nicola Conningham', N'80038 Elka Court', N'nconninghamz@europa.eu', N'http://dummyimage.com/227x100.png/dddddd/000000', N'415-458-5661', 1, 2, CAST(N'2021-11-21T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (48, N'arikel10', N'fQ90sIFAY', N'Adoree Rikel', N'504 4th Park', N'arikel10@huffingtonpost.com', N'http://dummyimage.com/224x100.png/dddddd/000000', N'702-228-5358', 1, 2, CAST(N'2021-06-22T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (49, N'cgashion11', N'DNPis5k', N'Cookie Gashion', N'107 Butterfield Center', N'cgashion11@seattletimes.com', N'http://dummyimage.com/170x100.png/cc0000/ffffff', N'585-805-6918', 1, 2, CAST(N'2021-08-03T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (50, N'tnaisbit12', N'qscnvZibQE', N'Temple Naisbit', N'94396 Thierer Junction', N'tnaisbit12@shinystat.com', N'http://dummyimage.com/125x100.png/ff4444/ffffff', N'568-685-1959', 1, 2, CAST(N'2021-05-04T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (51, N'socahey13', N'WzWxDqMj', N'Shayne O''Cahey', N'119 Saint Paul Place', N'socahey13@java.com', N'http://dummyimage.com/130x100.png/5fa2dd/ffffff', N'998-892-8418', 1, 2, CAST(N'2021-07-10T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (52, N'cphilippet14', N'm1f5vqrHvw7', N'Cammy Philippet', N'165 North Park', N'cphilippet14@intel.com', N'http://dummyimage.com/132x100.png/cc0000/ffffff', N'784-135-4055', 1, 2, CAST(N'2021-04-26T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (53, N'lworg15', N'XK7vL6', N'Linnell Worg', N'883 Mcguire Trail', N'lworg15@usa.gov', N'http://dummyimage.com/235x100.png/5fa2dd/ffffff', N'659-406-8204', 1, 2, CAST(N'2022-01-09T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (54, N'vbellefonte16', N'fLPnjoXb5O3b', N'Valentine Bellefonte', N'982 Morning Plaza', N'vbellefonte16@geocities.com', N'http://dummyimage.com/126x100.png/dddddd/000000', N'299-564-8541', 1, 2, CAST(N'2021-04-29T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (55, N'tpilbeam17', N'cPOeLbF45', N'Teirtza Pilbeam', N'73568 Thackeray Junction', N'tpilbeam17@auda.org.au', N'http://dummyimage.com/209x100.png/5fa2dd/ffffff', N'660-250-0959', 1, 2, CAST(N'2021-12-20T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (56, N'rtenniswood18', N'gayFx1x', N'Remington Tenniswood', N'8 Katie Plaza', N'rtenniswood18@redcross.org', N'http://dummyimage.com/209x100.png/ff4444/ffffff', N'677-323-7954', 1, 2, CAST(N'2021-06-10T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (57, N'tcurlis19', N'lqvX4y', N'Tedman Curlis', N'246 Heath Plaza', N'tcurlis19@nbcnews.com', N'http://dummyimage.com/108x100.png/5fa2dd/ffffff', N'894-508-1597', 1, 2, CAST(N'2022-01-21T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (58, N'aboick1a', N'EzLJpc', N'Aubine Boick', N'9718 Forster Street', N'aboick1a@arizona.edu', N'http://dummyimage.com/132x100.png/dddddd/000000', N'972-258-9255', 1, 2, CAST(N'2021-09-08T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (59, N'cmiller1b', N'PAgGdRwITt', N'Corine Miller', N'38 Johnson Street', N'cmiller1b@seattletimes.com', N'http://dummyimage.com/214x100.png/5fa2dd/ffffff', N'976-344-0831', 1, 2, CAST(N'2021-09-08T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (60, N'jsandsallan1c', N'VXLzuiCeNJ', N'Julita Sands-Allan', N'8239 Linden Park', N'jsandsallan1c@ning.com', N'http://dummyimage.com/206x100.png/ff4444/ffffff', N'204-810-2913', 1, 2, CAST(N'2021-11-23T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (61, N'mcroom1d', N'vJohsNo', N'Marcelia Croom', N'51 Evergreen Pass', N'mcroom1d@opera.com', N'http://dummyimage.com/105x100.png/cc0000/ffffff', N'858-949-7959', 1, 2, CAST(N'2021-07-28T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (62, N'phambers1e', N'tMvD7d6', N'Pincas Hambers', N'38 Westport Parkway', N'phambers1e@tmall.com', N'http://dummyimage.com/161x100.png/dddddd/000000', N'787-540-1384', 1, 2, CAST(N'2021-08-04T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (63, N'amuspratt1f', N'BEonxG1Zqw3M', N'Alair Muspratt', N'27 Leroy Hill', N'amuspratt1f@wordpress.com', N'http://dummyimage.com/151x100.png/5fa2dd/ffffff', N'660-721-8903', 1, 2, CAST(N'2022-01-12T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (64, N'fjiru1g', N'N0E2f5HCaun', N'Fannie Jiru', N'23 Ruskin Place', N'fjiru1g@imdb.com', N'http://dummyimage.com/229x100.png/cc0000/ffffff', N'906-326-4076', 1, 2, CAST(N'2021-07-26T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (65, N'nbasek1h', N'5hHmPmqPMfb2', N'Nedda Basek', N'9635 Nevada Crossing', N'nbasek1h@washingtonpost.com', N'http://dummyimage.com/190x100.png/5fa2dd/ffffff', N'703-115-9886', 1, 2, CAST(N'2021-03-24T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (66, N'mwallington1i', N'g2pKQgFtK', N'Merralee Wallington', N'1 Lukken Place', N'mwallington1i@hatena.ne.jp', N'http://dummyimage.com/202x100.png/ff4444/ffffff', N'592-934-0918', 1, 2, CAST(N'2021-11-09T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (67, N'mcoggan1j', N'pZ0eqQ', N'Micheline Coggan', N'869 Helena Lane', N'mcoggan1j@scribd.com', N'http://dummyimage.com/242x100.png/dddddd/000000', N'715-466-9915', 1, 2, CAST(N'2021-12-12T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (68, N'creen1k', N'nr683JEG4', N'Courtnay Reen', N'74585 Michigan Way', N'creen1k@indiatimes.com', N'http://dummyimage.com/130x100.png/ff4444/ffffff', N'154-474-7748', 1, 2, CAST(N'2021-08-20T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (69, N'dlempke1l', N'szfxVr2Hhv', N'Dudley Lempke', N'3 Bunting Avenue', N'dlempke1l@nps.gov', N'http://dummyimage.com/146x100.png/dddddd/000000', N'585-510-5573', 1, 2, CAST(N'2021-11-14T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (70, N'bdightham1m', N'tfXV23hMo2W', N'Berkeley Dightham', N'68590 Warner Crossing', N'bdightham1m@forbes.com', N'http://dummyimage.com/179x100.png/cc0000/ffffff', N'124-482-2578', 1, 2, CAST(N'2021-04-19T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (71, N'cgeorgeon1n', N'6w351oPb1', N'Cordie Georgeon', N'30201 Swallow Trail', N'cgeorgeon1n@sohu.com', N'http://dummyimage.com/116x100.png/ff4444/ffffff', N'627-996-0420', 1, 2, CAST(N'2022-02-24T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (72, N'fcars1o', N'6l3smxYb7hj', N'Franciska Cars', N'292 Ohio Circle', N'fcars1o@howstuffworks.com', N'http://dummyimage.com/103x100.png/5fa2dd/ffffff', N'498-441-1175', 1, 2, CAST(N'2021-12-11T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (73, N'hhardwicke1p', N'LS3ZYHcrSUt', N'Hedwiga Hardwicke', N'9382 Jana Point', N'hhardwicke1p@mysql.com', N'http://dummyimage.com/162x100.png/cc0000/ffffff', N'285-919-9278', 1, 2, CAST(N'2021-11-17T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (74, N'fthorley1q', N'narCWjApCj', N'Faber Thorley', N'26870 Lindbergh Court', N'fthorley1q@cafepress.com', N'http://dummyimage.com/160x100.png/5fa2dd/ffffff', N'772-280-5614', 1, 2, CAST(N'2021-11-02T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (75, N'mdakhov1r', N'mXHs37SO', N'Melisent Dakhov', N'7282 Ohio Circle', N'mdakhov1r@npr.org', N'http://dummyimage.com/112x100.png/cc0000/ffffff', N'706-248-9611', 1, 2, CAST(N'2021-04-19T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (76, N'cvondruska1s', N'SCZlN3cYcm', N'Carleton Vondruska', N'015 Westridge Plaza', N'cvondruska1s@blogspot.com', N'http://dummyimage.com/133x100.png/ff4444/ffffff', N'908-927-1168', 1, 2, CAST(N'2021-07-19T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (77, N'byukhtin1t', N'1nICMZtfa', N'Babbie Yukhtin', N'13852 Hudson Crossing', N'byukhtin1t@paypal.com', N'http://dummyimage.com/201x100.png/dddddd/000000', N'135-505-1461', 1, 2, CAST(N'2021-12-21T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (78, N'rridd1u', N'vtlpEHj', N'Riannon Ridd', N'1924 Mariners Cove Circle', N'rridd1u@wix.com', N'http://dummyimage.com/129x100.png/cc0000/ffffff', N'521-732-8368', 1, 2, CAST(N'2021-07-23T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (79, N'hmelanaphy1v', N'13MNtP', N'Hedy Melanaphy', N'5 Anzinger Drive', N'hmelanaphy1v@patch.com', N'http://dummyimage.com/225x100.png/5fa2dd/ffffff', N'314-885-8285', 1, 2, CAST(N'2021-09-14T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (80, N'jobrollachain1w', N'2cNkmbk', N'Jordan O''Brollachain', N'86517 Jana Road', N'jobrollachain1w@miibeian.gov.cn', N'http://dummyimage.com/142x100.png/5fa2dd/ffffff', N'922-447-3160', 1, 2, CAST(N'2021-05-24T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (81, N'kdoby1x', N'Vjiya9vVho', N'Kamilah Doby', N'15740 Garrison Alley', N'kdoby1x@tinypic.com', N'http://dummyimage.com/202x100.png/ff4444/ffffff', N'910-394-7070', 1, 2, CAST(N'2022-02-19T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (82, N'cnortham1y', N'3hHZntlzU77', N'Corissa Northam', N'49528 Vernon Way', N'cnortham1y@loc.gov', N'http://dummyimage.com/211x100.png/5fa2dd/ffffff', N'432-689-9965', 1, 2, CAST(N'2021-10-04T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (83, N'dwhitcombe1z', N'9OxoPHDZ', N'Daile Whitcombe', N'929 Sunfield Way', N'dwhitcombe1z@google.cn', N'http://dummyimage.com/112x100.png/5fa2dd/ffffff', N'299-675-2735', 1, 2, CAST(N'2021-11-11T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (84, N'rpumfrey20', N'JllPEOu', N'Rosalyn Pumfrey', N'327 Vermont Circle', N'rpumfrey20@instagram.com', N'http://dummyimage.com/249x100.png/5fa2dd/ffffff', N'414-257-9682', 1, 2, CAST(N'2021-11-20T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (85, N'ddurtnell21', N'ZSR5XGC8aMsl', N'Doretta Durtnell', N'61 Ohio Avenue', N'ddurtnell21@reuters.com', N'http://dummyimage.com/138x100.png/5fa2dd/ffffff', N'304-100-1719', 1, 2, CAST(N'2022-02-19T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (86, N'bbaike22', N'Eoie9GZLd', N'Barris Baike', N'97531 Warner Alley', N'bbaike22@wordpress.com', N'http://dummyimage.com/146x100.png/dddddd/000000', N'461-141-2571', 1, 2, CAST(N'2021-05-29T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (87, N'cmcgennis23', N'm7hvIFp', N'Chuck McGennis', N'9 Hooker Alley', N'cmcgennis23@stumbleupon.com', N'http://dummyimage.com/222x100.png/5fa2dd/ffffff', N'733-409-6615', 1, 2, CAST(N'2021-09-30T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (88, N'nwinspare24', N'hA16L4V4t', N'Nikolas Winspare', N'4887 Arizona Hill', N'nwinspare24@moonfruit.com', N'http://dummyimage.com/250x100.png/dddddd/000000', N'429-964-6058', 1, 2, CAST(N'2021-06-25T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (89, N'wbergstrand25', N'DHUdTgnD2o', N'Washington Bergstrand', N'3236 Granby Place', N'wbergstrand25@yellowbook.com', N'http://dummyimage.com/246x100.png/cc0000/ffffff', N'759-367-1656', 1, 2, CAST(N'2021-11-18T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (90, N'echatband26', N'tMQVhMhU1YS3', N'Elspeth Chatband', N'76097 Bay Point', N'echatband26@npr.org', N'http://dummyimage.com/162x100.png/cc0000/ffffff', N'876-294-6493', 1, 2, CAST(N'2021-05-17T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (91, N'fdanforth27', N'Ad8nhUi', N'Freeland Danforth', N'28 2nd Alley', N'fdanforth27@github.io', N'http://dummyimage.com/151x100.png/5fa2dd/ffffff', N'337-627-1288', 1, 2, CAST(N'2021-03-16T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (92, N'jdominey28', N'bBLP23BW', N'Jakob Dominey', N'41972 Memorial Parkway', N'jdominey28@hc360.com', N'http://dummyimage.com/206x100.png/ff4444/ffffff', N'676-329-0967', 1, 2, CAST(N'2021-11-13T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (93, N'hsultana29', N'DOy6kReWs', N'Horacio Sultana', N'51156 Nova Court', N'hsultana29@dyndns.org', N'http://dummyimage.com/245x100.png/5fa2dd/ffffff', N'577-876-2003', 1, 2, CAST(N'2021-12-11T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (94, N'dfeldmann2a', N'OtK7nInp7', N'Deana Feldmann', N'50434 Pennsylvania Avenue', N'dfeldmann2a@163.com', N'http://dummyimage.com/182x100.png/ff4444/ffffff', N'703-753-7645', 1, 2, CAST(N'2021-07-31T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (95, N'adudmarsh2b', N'85Endf6ZDk', N'Alexandro Dudmarsh', N'05 Kipling Circle', N'adudmarsh2b@blogs.com', N'http://dummyimage.com/213x100.png/ff4444/ffffff', N'668-953-1706', 1, 2, CAST(N'2021-06-11T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (96, N'halejandre2c', N'7Ll5FRWM', N'Holli Alejandre', N'7426 Maywood Way', N'halejandre2c@nasa.gov', N'http://dummyimage.com/143x100.png/ff4444/ffffff', N'293-880-7890', 1, 2, CAST(N'2021-08-05T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (97, N'rprinne2d', N'kI2XdhXyU8u', N'Romona Prinne', N'2 Vidon Lane', N'rprinne2d@ow.ly', N'http://dummyimage.com/194x100.png/ff4444/ffffff', N'717-218-4953', 1, 2, CAST(N'2022-03-06T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (98, N'gnarbett2e', N'lZ57l0', N'Gearard Narbett', N'577 Muir Point', N'gnarbett2e@is.gd', N'http://dummyimage.com/198x100.png/ff4444/ffffff', N'101-454-7193', 1, 2, CAST(N'2021-07-09T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (99, N'tjansey2f', N'kCIg081c8', N'Tomas Jansey', N'86 Haas Center', N'tjansey2f@clickbank.net', N'http://dummyimage.com/156x100.png/5fa2dd/ffffff', N'165-664-8936', 1, 2, CAST(N'2021-06-02T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (100, N'dobell2g', N'OmQUUATMWO5', N'Dyanne Obell', N'7 Kinsman Plaza', N'dobell2g@parallels.com', N'http://dummyimage.com/108x100.png/ff4444/ffffff', N'650-413-5361', 1, 2, CAST(N'2021-10-04T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (101, N'dmonard2h', N'K25hwDB', N'Dimitry Monard', N'35626 Summit Way', N'dmonard2h@pbs.org', N'http://dummyimage.com/224x100.png/5fa2dd/ffffff', N'611-545-4684', 1, 2, CAST(N'2021-06-27T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (102, N'mgiacomi2i', N'yJfrkp', N'Mercie Giacomi', N'257 Hoepker Way', N'mgiacomi2i@columbia.edu', N'http://dummyimage.com/187x100.png/5fa2dd/ffffff', N'981-588-2608', 1, 2, CAST(N'2021-10-10T00:00:00.000' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (103, N'rjurczik2j', N'hrM4DQ2uVbiD', N'Rodina Jurczik', N'38283 Bluejay Drive', N'rjurczik2j@sourceforge.net', N'http://dummyimage.com/248x100.png/ff4444/ffffff', N'105-517-4014', 1, 2, CAST(N'2021-12-23T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (104, N'vmarcoolyn2k', N'lre91q', N'Violet Marcoolyn', N'2223 Merrick Parkway', N'vmarcoolyn2k@buzzfeed.com', N'http://dummyimage.com/101x100.png/dddddd/000000', N'107-407-6476', 1, 2, CAST(N'2021-04-29T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (105, N'pbroune2l', N'mT4eadqcGB', N'Pepillo Broune', N'51 Loeprich Circle', N'pbroune2l@si.edu', N'http://dummyimage.com/205x100.png/ff4444/ffffff', N'348-329-6547', 1, 2, CAST(N'2021-03-21T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (106, N'cwhorall2m', N'bj7g65BAKiiI', N'Cornall Whorall', N'930 Sutteridge Point', N'cwhorall2m@newyorker.com', N'http://dummyimage.com/102x100.png/ff4444/ffffff', N'292-626-4168', 1, 2, CAST(N'2021-10-17T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (107, N'sperell2n', N'pfsIcprGs0', N'Sergeant Perell', N'053 Laurel Plaza', N'sperell2n@walmart.com', N'http://dummyimage.com/209x100.png/cc0000/ffffff', N'349-298-5750', 1, 2, CAST(N'2021-09-14T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (108, N'mmacey2o', N'YNeJQx', N'Modesta Macey', N'694 Sunfield Plaza', N'mmacey2o@google.co.uk', N'http://dummyimage.com/246x100.png/ff4444/ffffff', N'339-551-4414', 1, 2, CAST(N'2021-07-04T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (109, N'gbank2p', N'87OLa7JoFww', N'Gustave Bank', N'767 Duke Plaza', N'gbank2p@clickbank.net', N'http://dummyimage.com/131x100.png/5fa2dd/ffffff', N'842-292-4388', 1, 2, CAST(N'2022-01-20T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (110, N'pbaitey2q', N'kPxtVll4UO', N'Paddie Baitey', N'12741 Tennessee Street', N'pbaitey2q@networksolutions.com', N'http://dummyimage.com/226x100.png/cc0000/ffffff', N'669-133-4738', 1, 2, CAST(N'2021-06-15T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (111, N'bsuerz2r', N'NFlTTuoekV', N'Bernadine Suerz', N'0 Erie Hill', N'bsuerz2r@bandcamp.com', N'http://dummyimage.com/219x100.png/cc0000/ffffff', N'195-247-0258', 1, 2, CAST(N'2021-06-19T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (113, N'namlt', N'$2a$10$sbIsQmsYIG5OH7lbd/r98.5Rtrg6gUx.tIUF6vLXISXVnxiSWU1Ea', NULL, NULL, N'namlt', NULL, NULL, 1, 2, CAST(N'2022-03-13T05:07:10.047' AS DateTime), CAST(N'2022-03-13T05:07:10.047' AS DateTime), NULL)
INSERT [dbo].[AppUser] ([id], [username], [password], [fullname], [address], [email], [avatar_image], [phone], [enabled], [role_id], [created_date], [updated_date], [deleted_date]) VALUES (114, N'namlt1', N'$2a$10$8gqZDgeUGracbenDDP5P.OSFLplRIvJ9cQgJ0l3G3TVlGxZC3f3NS', N'Lê Thành Nam', N'332/42/5c', N'ltn9897@gmail.com', N'http://cdn.onlinewebfonts.com/svg/img_264570.png', N'+84987680097', 1, 2, CAST(N'2022-03-13T09:07:17.150' AS DateTime), CAST(N'2022-03-13T09:08:20.430' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[AppUser] OFF
GO
SET IDENTITY_INSERT [dbo].[Catalog] ON 

INSERT [dbo].[Catalog] ([id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (1, N'Development', N'This course gives students experience designing, implementing, testing, and debugging large programs. Students will also get advanced Java programming experience; covering topics such as inheritance, multithreading, networking, database programming, and web development', CAST(N'2022-01-21T21:01:28.160' AS DateTime), NULL, NULL)
INSERT [dbo].[Catalog] ([id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (2, N'Design', N'This course introduces the techniques used in typography, which is the visual communication of information through type. A historical perspective will trace the development of typography from its beginning to its current use in graphic design. Students will learn about the transition from traditional techniques and concepts to the creation of electronic documents utilizing quality typographic work. Attention to detail will be stressed so that students have an opportunity to acquire and demonstrate the use of the typographic skills necessary in today''s graphic design work.', CAST(N'2022-01-21T21:01:28.160' AS DateTime), NULL, NULL)
INSERT [dbo].[Catalog] ([id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (3, N'Bussiness', N'A smart business decision maker understands how to make their organization more profitable and productive through the use of technology. With a BAIS major, you can be that decision maker. Open the door to big-time careers where you''ll help your company succeed with the power of data.', CAST(N'2022-01-21T21:01:28.160' AS DateTime), NULL, NULL)
INSERT [dbo].[Catalog] ([id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (4, N'Marketing', N'Studying marketing means becoming a valuable employee in any industry. Marketing is everywhere, so it''s easy for us to find interesting, real-world experience for you. Some students create a social media campaign for a local restaurant, others get to design a brand new website. There''s so much to do, so we''ve narrowed marketing down to four specific tracks. Choose the one that fits your interests and personality and grow into a stand-out marketer.', CAST(N'2022-01-21T21:01:28.160' AS DateTime), CAST(N'2022-01-21T21:16:30.710' AS DateTime), NULL)
INSERT [dbo].[Catalog] ([id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (5, N'Finace & Accounting', N'In addition to meeting with your advisor throughout your time at Tippie, you''ll also use the course planning worksheet—it will help you know what courses you need to take for your major, as well as help you plan when you''ll take them. Plan your course schedule with the worksheet and read about the courses you''ll be taking below.', CAST(N'2022-01-21T21:01:28.160' AS DateTime), NULL, NULL)
INSERT [dbo].[Catalog] ([id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (10, N'Personal Development', N'Personal development consists of activities that develop a person''s capabilities and potential, build human capital, facilitate employability, and enhance quality of life and the realization of dreams and aspirations', CAST(N'2000-04-04T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Catalog] ([id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (12, N'Lifestyle', N'Art & Crafts', CAST(N'2022-03-13T05:11:34.437' AS DateTime), CAST(N'2022-03-13T05:11:34.437' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Catalog] OFF
GO
SET IDENTITY_INSERT [dbo].[Conversation] ON 

INSERT [dbo].[Conversation] ([id], [user_id_one], [user_id_two], [created_date], [updated_date], [deleted_date]) VALUES (1, 2, 1, CAST(N'2022-03-02T12:04:56.827' AS DateTime), CAST(N'2022-03-02T12:04:56.827' AS DateTime), NULL)
INSERT [dbo].[Conversation] ([id], [user_id_one], [user_id_two], [created_date], [updated_date], [deleted_date]) VALUES (2, 7, 1, CAST(N'2022-03-02T13:01:49.317' AS DateTime), CAST(N'2022-03-02T13:01:49.317' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Conversation] OFF
GO
SET IDENTITY_INSERT [dbo].[Course] ON 

INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (1, 1, N'JavaScript', N'Javascript for Beginners', N'Take this Javascript training course and start learning Javascript today.

"As a business guy I have no place in programming." Ten years ago you could have gotten away with that statement. Today you say that to your colleagues and they scoff at you before they go back to their computers to fix real problems and do real work.

If you want to do something useful start by learning Javascript . In these days when the browser is central to all computer use knowing "the language of the browser" is the most important step. A few years ago Javascript potential was uncertain and many programmers considered it useless. These days however competent programmers have identified Javascript real potential and uses and it has gone from a toy language to the main language of the browser. It has become one of the most useful languages of this era. Every developer needs at least a basic understanding of Javascript. A developer who knows Javascript is the rockstar of the company and is in constant demand by employers. Our online Javascript

course will get you started by teaching all the essential aspects of coding in Javascript. So... what''s it gonna be? Do you want to supercharge your career and be in constant demand by employers? Do you want to learn how to create dynamic and innovative Javascript documents? Start programming today with our Javascript course for Beginners training and take control of', NULL, N'Web Designers looking to improve their skill set
Programmers who need to learn Javascript for their web applications
People looking to start programming and need a first programming language to learn
Students who want to learn Javascript
People who manage a web site as a volunteer or as a hobby
Bloggers-- even if you use Wordpress or another CMS!
Anyone else who wants to learn Javascript', N'Extensive, informative and interesting video lecture
Complete Code demonstrated in lecture
Lab Exercises
Lab Solution Sets
All Powerpoint Demonstrations Used in Course
Instructor contact Email for questions and clarifications
Coverage of all important primary Javascript concepts', CAST(N'2022-01-22' AS Date), 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'https://cdn.tgdd.vn/hoi-dap/1321801/javascript-la-gi-co-vai-tro-gi-cach-bat-javascript-tren.001.jpg', CAST(N'2022-01-22T12:38:26.683' AS DateTime), CAST(N'2022-01-22T12:38:26.683' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (2, 1, N'React', N'The quick guide to learn basic concepts and workflow of how to build React app', N'This short course will cover basic and core concepts that you need to know to get up and running with ReactJS.

React JS is a Javascript library for building user interfaces. It''s flexible, fast, easy to learn and fun to work with. ReactJS is designed to make the process of building modular, reusable user interface components simple and intuitive. React was developed at Facebook and focuses on the ''View'' aspect of MVC in web applications. React was built for the purpose of developing applications that are large in nature and have to deal with time changing data.

Also in this course, it will get you up to speed quickly with easy to follow short videos. It is project-oriented with hands-on examples, from simple to complex, that will help you with the most fundamentals concepts of React', NULL, N'Anyone who want to learn React without much knowledge of HTML or CSS.', N'Taste of how to build your very first React component.
How to handle event in components.
Understand two key concepts of React: State and Props.
How to reuse and nest components.
How to transfer data between Parent, Child components.', CAST(N'2022-01-22' AS Date), 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/x0fSBAgBrOQ?list=PL_-VfJajZj0UXjlKfBwFX73usByw3Ph9Q', N'https://codelearn.io/Upload/Blog/react-js-co-ban-phan-1-63738082145.3856.jpg', CAST(N'2022-01-22T12:38:26.683' AS DateTime), CAST(N'2022-01-22T12:38:26.683' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (3, 1, N'CSS', N'Learn how to code in CSS in 1 hour. This class is set up for complete beginners!', N'In this tutorial series you get to learn about CSS. CSS is the number design language for the web. CSS is easy to learn and it is used in most web development today. This course is a 1 hour course of action packed material. By the end of it you will have a firm understanding of the concepts of CSS. ', NULL, N'People who want to learn about web development', N'Learn how to become a web developer
Learn CSS
Learn how to design websites', CAST(N'2022-01-22' AS Date), 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://blog.haposoft.com/content/images/size/w2000/2021/10/6d07a36ebe6d55273b39440f2391f1d7e6d4092a.png', CAST(N'2022-01-22T12:38:26.683' AS DateTime), CAST(N'2022-01-22T12:38:26.683' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (4, 1, N'Angular', N'Have limited time to learn Angular 4 (Angular 2+)? Take this course and learn Angular in 10 hours!', N'Chances are you have heard that Angular developers are in demand these days. And you are here to learn Angular fast. 



There are tons of great courses out there for learning Angular. But most these courses are more than 20 hours long. If you''re a busy developer and need to quickly pick up Angular, this is the ideal course for you. 



This course contains 20 hours of content but you only need to watch the first 10 hours. The other 10 hours are recorded with an earlier version of Angular. You don''t need to watch those videos. 



So, in  just 10 hours, you can learn all the essential Angular concepts! You can simply dedicate a weekend to this course and by the end of the weekend you''ll have a good understanding of Angular and you''ll be able to build real client apps with Angular. ', NULL, N'Web developers wanting to build apps with Angular 2+', N'Master the essential Angular concepts
Troubleshoot common runtime errors
Write cleaner, more maintainable code', CAST(N'2022-01-22' AS Date), 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/k5E2AVpwsko', N'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2019/04/angular-homepage.jpg', CAST(N'2022-01-22T12:38:26.683' AS DateTime), CAST(N'2022-01-22T12:38:26.683' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (5, 1, N'NodeJs', N'Create & Deploy High Performance Node JS Apps on the Cloud and More !', N'NodeJS is a platform that allows developers to write server side high performance and networked applications. And that too using good old Javascript. But wait ! Isn''t Javascript meant to be used for forms and stuff on web pages ?

Well that was 10 years ago. The world has gone from ''Oops! You''ve not filled up the form properly !'' days to today''s modern web apps and social media sites that rely heavily on Javascript. Google Apps, Facebook, Twitter, Google Plus and LinkedIn, being handful examples of this movement. And to think that this quantum leap would not have been possible without Javascript is not an overstatement. Today, when you socialize with your friends on Facebook, or use your Gmail inbox, you''re running thousands of lines of code written in Javascript, in your browser.

With Node JS, you can take this knowledge back on the server, where usually you would expect to see the likes of PHP, Ruby, ASP dot NET etc. But that''s only a small portion of the reason why NodeJS is so cool. The fact that you can write full blown networked applications (think chat servers, collaborative tools, real-time data visualisation apps) with just a few lines of code is more than reason enough to not only look at NodeJS, but deep dive into it !', NULL, N'Web Designers & Front End Developers who wish to extend their knowledge of Javascript for building high performance network applications.', N'Build High Performance and Scalable Apps using NodeJS
Learn about ES6 with my free eBook - ECMAScript 6 QuickBytes
Use NodeJS Streams to write a Web Server
Use the Node Package Manager (NPM) for managing dependencies
Use the Express 4 Framework for building NodeJS Apps
', CAST(N'2022-01-22' AS Date), 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/z2f7RHgvddc?list=PL_-VfJajZj0VatBpaXkEHK_UPHL7dW6I3', N'https://tuanntblog.com/wp-content/uploads/2018/11/nodejs-new-pantone-black-686x420.png', CAST(N'2022-01-22T12:38:26.683' AS DateTime), CAST(N'2022-01-22T12:38:26.683' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10002, 1, N'HTML', N'Learn modern HTML5, CSS3 and web design by building a stunning website for your portfolio! Includes flexbox and CSS Grid', N'*** The #1 bestselling HTML and CSS course on Udemy! ***

*** Completely re-built from scratch in July 2021 (35+ hours video) ***

"Having gone through other related courses on other platforms, I can say this course is the most practical and readily applicable course on web design and development I have taken." — Bernie Pacis



Open a new browser tab, type in www.omnifood.dev, and take a look around. I will wait here...

...

Amazing, right? What if you knew exactly how to design and build a website like that, completely from scratch? How amazing would that be?

Well, I''m here to teach you HTML, CSS, and web design, all by building the stunning website that you just saw, step-by-step.

So, after finishing this course, you will know exactly how to build a beautiful, professional, and ready-to-launch website just like Omnifood, by following a 7-step process. And it will even look great on any computer, tablet, and smartphone.

But what if you want to build a completely different website? Well, no problem! I designed the course curriculum with exactly this goal: to enable you to design and build any website that you can think of, not just copy the course project.

', NULL, N'Students with some knowledge about HTML and CSS, but who struggle to put together a great website
', N'Become a modern and confident HTML and CSS developer, no prior knowledge needed!
Design and build a stunning real-world project for your portfolio from scratch
Modern, semantic and accessible HTML5', CAST(N'2022-01-22' AS Date), 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://d1iv5z3ivlqga1.cloudfront.net/wp-content/uploads/2021/02/30162210/html-va-css-1.jpg', CAST(N'2022-02-08T20:30:47.697' AS DateTime), CAST(N'2022-01-22T12:38:26.683' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10003, 1, N'PHP', N'Learn to Create an Online Store E-COMMERCE website in PHP & MySQLi from scratch with Admin Panel.', N'Learn to create an E-Commerce Website from scratch in PHP & MySQL, building an online shopping store in PHP & MySQL had never been easier from scratch before this course. You are going to create your first online store using PHP and MySQL from start to end.

What is this e-commerce site all about? 

E-commerce is an online shopping store for selling/buying products, we''ll use simple PHP and MySQL queries to create this project, if you are really serious about creating an eCommerce website from absolutely 0 knowledge, then this course is for you.', N'Basics of PHP will be a plus', N'Those who are strugglyingg to create a simple eCommerce site with PHP & MySQL
Students who want to create a practical project using PHP & MySQL from scratch
', N'Learn to create an ecommerce website with Admin Panel & online store
Build an online store with PHP and MySQL from scratch
Learn to Create a CMS (Content Management System) for eCommerce Website in PHP & MySQLi
A complete step by step project in PHP and MySQL for beginners
Create a fully pledge online store that can receive orders from customers', CAST(N'2022-01-22' AS Date), 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://cafedev.vn/wp-content/uploads/2020/08/cafedev_tuhoc_php.png', CAST(N'2022-02-08T20:31:57.423' AS DateTime), CAST(N'2022-01-22T12:38:26.683' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10005, 1, N'Django', N'Dive in deep to the core concepts behind the power Django framework written in Python. Using Django 1.10 with Python 3
Rating: 4.4 out of 5
4.4
 (1,459 ratings)
85,634 students', N'Our philosophy is teaching individuals how to code by going through step by step projects. This drives the majority of our content with one exception: the Django Core course. 

In this course, we go in-depth into various Django concepts to provide a comprehensive guide to topics that include', N'Try Django 1.8 & Up (suggested course is Try Django 1.9 as it has Try Django 1.8 too)
Python knowledge is a plus (30 Days of Python is a suggested course)', N'Any student looking to build robust cutting edge web applications', N'Django Models
Model Instance Methods & Properties
Model-level field validation
Django Forms and Formsets
Form validation
Model Form
Function Based Views (FBVs)
Class Based Views (CBVs)
CRUD in Django Views (Create Retrieve Update Delete List)
Django Templates
Django translation
Deploying Django on a Live Server| Heroku, Webfaction, Linode, Digital Ocean
Celery + Redis for asynchronous tasks and scheduled tasks
and much more!
Requirements are Python 2.7 or 3.3 and Django 1.8 & up
We use Python 3 and Django 1.10 in this one', CAST(N'2022-01-22' AS Date), 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://vi.hostmehost.com/shared_upload/django.jpg', CAST(N'2022-02-08T20:44:38.570' AS DateTime), CAST(N'2022-01-22T12:38:26.683' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10006, 2, N'Python', N'Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!', N'o you want to become a programmer? Do you want to learn how to create games, automate your browser, visualize data, and much more?

If you’re looking to learn Python for the very first time or need a quick brush-up, this is the course for you!

Python has rapidly become one of the most popular programming languages around the world. Compared to other languages such as Java or C++, Python consistently outranks and outperforms these languages in demand from businesses and job availability. The average Python developer makes over $100,000 - this number is only going to grow in the coming years.

The best part? Python is one of the easiest coding languages to learn right now. It doesn’t matter if you have no programming experience or are unfamiliar with the syntax of Python. By the time you finish this course, you''ll be an absolute pro at programming!', N'Macintosh (OSX)/ Windows(Vista and higher) Machine
Internet Connection', N'Even if you haven''t touched coding before, it won''t matter. The easy step-to-step lectures will quickly guide you through everything you''ll need to know about coding, mainly Python. This course is here for you to get accustomed and familiar with Python and its syntax. And above all, Python is one of the easiest coding languages to learn, and there''s a lot you can do with it.', N'Create their own Python Programs
Become an experienced Python Programmer
Parse the Web and Create their own Games', CAST(N'2022-01-22' AS Date), 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://www.python.org/static/community_logos/python-logo-master-v3-TM.png', CAST(N'2022-02-08T20:58:45.190' AS DateTime), CAST(N'2022-01-22T12:38:26.683' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10007, 2, N'Machine Learning', N'Data science, machine learning, and artificial intelligence in Python for students and professionals', N'This course teaches you about one popular technique used in machine learning, data science and statistics: linear regression. We cover the theory from the ground up: derivation of the solution, and applications to real-world problems. We show you how one might code their own linear regression module in Python.In the first section, I will show you how to use 1-D linear regression to prove that Moore''s Law is true.

What''s that you say? Moore''s Law is not linear?

You are correct! I will show you how linear regression can still be applied.

In the next section, we will extend 1-D linear regression to any-dimensional linear regression - in other words, how to create a machine learning model that can learn from multiple inputs.

We will apply multi-dimensional linear regression to predicting a patient''s systolic blood pressure given their age and weight.

Finally, we will discuss some practical machine learning issues that you want to be mindful of when you perform data analysis, such as generalization, overfitting, train-test splits, and so on.', N'How to take a derivative using calculus
Basic Python programming
For the advanced section of the course, you will need to know probability', N'People who are interested in data science, machine learning, statistics and artificial intelligence
People new to data science who would like an easy introduction to the topic
People who wish to advance their career by getting into one of technology''s trending fields, data science', N'Derive and solve a linear regression model, and apply it appropriately to data science problems
Program your own version of a linear regression model in Python', CAST(N'2022-01-22' AS Date), 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://khoahocphattrien.vn/Images/Uploaded/Share/2019/01/28/6d6hocmay.png', CAST(N'2022-02-22T18:47:49.063' AS DateTime), CAST(N'2022-02-22T18:47:49.063' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10008, 2, N'Data Analysis', N'This course is meant for newbies who are not familiar with machine learning, deep learning, computer vision and reinforcement learning or students looking for a quick refresher', N'Are you new to R?

Do you want to learn more about statistical programming?

Are you in a quantitative field?

You just started learning R but you struggle with all the free but unorganized material available elsewhere?

Do you want to hack the learning curve and stay ahead of your competition?

If your answer is YES to some of those points - read on!

This Tutorial is the first step - your Level 1 - to R mastery.

All the important aspects of statistical programming ranging from handling different data types to loops and functions, even graphs are covered.

While planing this course I used the Pareto 80/20 principle. I filtered for the most useful items in the R language which will give you a quick and efficient learning experience.

Learning R will help you conduct your projects. On the long run it is an invaluable skill which will enhance your career.

Your journey will start with the theoretical background of object and data types. You will then learn how to handle the most common types of objects in R. Much emphasis is put on loops in R since this is a crucial part of statistical programming. It is also shown how the apply family of functions can be used for looping.

In the graphics section you will learn how to create and tailor your graphs. As an example we will create boxplots, histograms and piecharts. Since the graphs interface is quite the same for all types of graphs, this will give you a solid foundation.

With the R Commander you will also learn about an alternative to RStudio. Especially for classic hypthesis tests the R Coomander GUI can save you some time.

According to the teaching principles of R Tutorials every section is enforced with exercises for a better learning experience. Furthermore you can also check out the r-tutorials R exercise database over at our webpage. In the database you will find more exercises on the topics of this course.
You can download the code pdf of every section to try the presented code on your own.

This tutorial is your first step to benefit from this open source software.

What R you waiting for?

Martin', N'interest in statistical programming
R and RStudio ready on your computer
basic understanding of statistics and data structure', N'scientists
data analysts
entrepreneurs
web developers
anybody interested in statistical programming', N'this course will show you how the most common types of graphs can be produced with R base
you will get a good understanding of functions and loops in R which are very useful programming skills to have
you will get the necessary theoretical background for R
you will learn how to create and handle different types of objects
you will get fluent in the R programming language to master your specific quantitative tasks', CAST(N'2022-01-22' AS Date), 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://teky.edu.vn/blog/wp-content/uploads/2021/07/Chia-se-ve-data-analysis.jpg', CAST(N'2022-02-24T22:42:46.643' AS DateTime), CAST(N'2022-02-24T22:42:46.643' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10009, 2, N'Statistics', N'Increase Your Data Analytic Skills – Highly Valued And Sought After By Employers', N'November, 2019. 

Join more than 1,000 students and get instant access to this best-selling content - enroll today!

Get marketable and highly sought after skills in this course that will substantially increase your knowledge of data analytics, with a focus in the area of significance testing, an important tool for A/B testing and product assessment.

Many tests covered, including three different t tests, two ANOVAs, post hoc tests, chi-square tests (great for A/B testing), correlation, and regression. Database management also covered!

Two in-depth examples provided of each test for additional practice.

This course is great for professionals, as it provides step by step instruction of tests with clear and accurate explanations. Get ahead of the competition and make these tests important parts of your data analytic toolkit!

Students will also have the tools needed to succeed in their statistics and experimental design courses.

Data Analytics is an rapidly growing area in high demand (e.g., McKinsey)

Statistics play a key role in the process of making sound business decisions that will generate higher profits. Without statistics, it''s difficult to determine what your target audience wants and needs. 

  Inferential statistics, in particular, help you understand a population''s needs better so that you can provide attractive products and services. 

  This course is designed for business professionals who want to know how to analyze data. You''ll learn how to use IBM SPSS to draw accurate conclusions on your research and make decisions that will benefit your customers and your bottom line. ', N'Introduction to statistics course (either currently taking or already have completed) is recommended but not absolutely necessary
Access to IBM SPSS Statistical software (strongly recommended)', N'Students seeking help with SPSS, especially how to analyze and interpret the results of statistical analyses
Professionals desiring to augment their statistical skills
Anyone seeking to increase their data analytic skills', N'In this course, you will gain proficiency in how to analyze a number of statistical procedures in SPSS.
You will learn how to interpret the output of a number of different statistical tests
Learn how to write the results of statistical analyses using APA format', CAST(N'2022-02-24' AS Date), 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://maas.vn/wp-content/uploads/2020/10/Picture1-1-768x432.png', CAST(N'2022-02-24T22:48:18.727' AS DateTime), CAST(N'2022-02-24T22:48:18.727' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10010, 2, N'Deep Learning', N'Machine Learning, Neural Networks, Computer Vision, Deep Learning and Reinforcement Learning in Keras and TensorFlow', N'Interested in Machine Learning, Deep Learning and Computer Vision? Then this course is for you!

This course is about the fundamental concepts of machine learning, deep learning, reinforcement learning and machine learning. These topics are getting very hot nowadays because these learning algorithms can be used in several fields from software engineering to investment banking.

In each section we will talk about the theoretical background for all of these algorithms then we are going to implement these problems together. We will use Python with SkLearn, Keras and TensorFlow.', N'Basic Python - we will use Panda and Numpy as well (we will cover the basics during implementations)', N'This course is meant for newbies who are not familiar with machine learning, deep learning, computer vision and reinforcement learning or students looking for a quick refresher', N'Solving regression problems (linear regression and logistic regression)
Solving classification problems (naive Bayes classifier, Support Vector Machines - SVMs)
Using neural networks (feedforward neural networks, deep neural networks, convolutional neural networks and recurrent neural networks
The most up to date machine learning techniques used by firms such as Google or Facebook
Face detection with OpenCV
TensorFlow and Keras
Deep learning - deep neural networks, convolutional neural networks (CNNS), recurrent neural networks (RNNs)', CAST(N'2022-02-24' AS Date), 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://longvan.net/hinhanh/tintuc/deep-learning-la-gi.png', CAST(N'2022-02-24T22:48:43.257' AS DateTime), CAST(N'2022-02-24T22:48:43.257' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10011, 3, N'Google Flutter', N'Learn Flutter mobile programming', N'Learn how to create fast and stunning mobile applications using Flutter, a new mobile framework by google. In this course you will quickly learn how to build an application in Flutter with no previous experience. It is HIGHLY recommended you understand the Dart programming language, see my Dart programming tutorials', N'Understanding of the Dart language', N'Anyone interested in learning Flutter mobile development', N'Make basic flutter applications', NULL, 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://cg2010studio.files.wordpress.com/2021/08/flutter-app-dev.png', CAST(N'2022-02-24T22:48:43.257' AS DateTime), NULL, NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10012, 3, N'Android Development', N'Learn the Basics of Developing an Android App and Build your very own Bluetooth Chat Application from Scratch.', N'Welcome to our course "A beginners guide to Android App Development (step by step)".

A Beginner''s Guide to Android App Development

Looking to launch your own app on Google Play Store but don''t know where to begin?

Then here''s your chance to learn the basics and build your skills in Android development. Before you read further, it is an essential prerequisite for a student to have a good understanding of Java (OOPs and Threads, in particular) 

The Android development course is a collection of Android Application Development tutorial videos. You will first get started with the software installation, cover basics like Layouts and Views, and gradually move on to more advanced topics. And then finally, you get to build your very own Bluetooth Chat Application right from scratch.

Take your first step and we will guide you into this amazing, ever-evolving world of Android.

More lectures will be uploaded soon.', N'Good understanding of Java (particularly OOPs and Threads)', N'Beginners who are new to Mobile Development
Freshers who want to learn Android Development', N'Android installation and setup for Android development
Concept of Layout and Views in Android development
Different ways to store your data on an Android device
Lists and Fragments in Android development
Trigger an Android notification
Build from scratch your very own Bluetooth Chat App to send and receive messages for Android', NULL, 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'http://localhost:8080/images/Android Development.jpg', CAST(N'2022-02-24T22:48:43.257' AS DateTime), CAST(N'2022-03-13T01:59:52.020' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10013, 3, N'Swift', N'Build iOS Apps & Learn iOS 11, Swift 4, ARKit (Augmented Reality), CoreML (Machine Learning)', N'Welcome to the world''s most comprehensive course on iOS development. This course is designed like an in-person coding bootcamp to give you the most amount of content and help with the least amount of cost.

NO PRIOR CODING EXPERIENCE REQUIRED', N'Must have a computer with OSX or macOS on it', N'If you are an absolute beginner to coding take this course
If you are an absolute beginner to iOS or mobile development then take this course', N'Build iOS 11 & Swift 4 apps
Work as an iOS contractor
Apply to jr. iOS development jobs
Submit iOS apps to the Apple App Store', NULL, 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://media.vlpt.us/images/tiana/post/980ea546-6c09-4ce6-abaa-cdeb3a67af14/Swift.png', CAST(N'2022-02-24T22:48:43.257' AS DateTime), NULL, NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10014, 3, N'IOS Development', N'In 10 days you can have your own app in the App Store! Learn how to make apps using Swift 4.2, Xcode 10, and iOS 12', N'Welcome to the 10-day iPhone App Bootcamp! If you''re looking for a course that is fun and gets straight to the point, then this is the course for you. This course will give brand-new programmers all of the skills that they need to create an app and submit it to the app store in just 10 days!

Other mega courses on Udemy offer 40+ hours of video content, but I wanted to create a course that was more manageable for beginners and didn''t include any fluff. In each video I dive straight into the topic, and don''t waste your time going over things that you don''t really need. I only focus on the essentials, and I give you hands-on practice so that you can easily master the things we are learning!', N'Must have a Mac Computer
No previous knowledge required :)', N'People who want to make an iPhone App
Complete beginners to programming', N'Submit Your Own App to the App Store!
Become a Swift 4 Programmer
Industry Tips Like How to Get a Job and Make Money from Your Apps
Create a Bitcoin Price Tracking App
Create a ToDo List App
Create a Joke Bank App
Create a Photo Based Collector App
Create an App With Machine Learning
', NULL, 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'http://www.chammuseum.danang.vn/wp-content/uploads/2021/05/1.png', CAST(N'2022-02-24T22:48:43.257' AS DateTime), NULL, NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10015, 3, N'Dart', N'No experience required', N'Learn how to create basic Dart programs. This course is aimed at the absolute beginner with no programming experience. Dart is an expressive and powerful language that has a very friendly learning curve. This makes it a great starting language. Dart helps you craft beautiful, high-quality experiences across all screens, with a client-optimized language, rich and powerful frameworks, flexible tooling', N'Basic computer skills', N'Anyone that wants to learn programming in Dart at a basic level', N'Installing an IDE
Varibales
Arrays
Flow Control
Functions
Error Handling', NULL, 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://dospace.org/wp-content/uploads/2021/05/Fundamentals-of-Game-Development.jpeg', CAST(N'2022-02-24T22:48:43.257' AS DateTime), NULL, NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10016, 3, N'Kotlin', N'Learn Kotlin from scratch! Grasp object-orientation and idiomatic Kotlin to realize coding projects and Android apps!', N'>> This is the only Udemy course that is referenced from the official Kotlin website as well as the official Android developers website for people who want to learn Kotlin, whether for Android or other purposes!

>> Learn programming in Kotlin, the most beautiful modern programming language based on Java!

>> Join this beginner-friendly course to learn to write code with an awesome and easy-to-learn language!

>> Expand your expertise as a Java or Android Developer and improve the quality of your code!

>> I''ll answer every question you have, help you personally if you get stuck and listen to your feedback! Join 15,000+ happy students of mine on Udemy!

This course will teach you programming in Kotlin! We begin with the basics so this course is completely suitable for beginners. You will put what you learn into practice in several coding challenges. So at the end, you''ll be able to create your own applications in Kotlin.

If you''re an Android developer, you can use this course to get up to speed with this awesome language. Kotlin will allow you to maintain a cleaner and more expressive code base, use concepts that go beyond even Java 8, and write more robust apps for Android.', N'We will go through all setup you need in order to use Kotlin
You must be able to install new software on your computer (JDK + IntelliJ), we will go through the actual process inside the course.', N'You do not need programming skills, we will start from scratch and slowly make our way to intermediate and more advanced topics
You should be excited to learn an awesome new programming language!
You will need basic skills in handling a PC, so you should know how to install and run applications on your computer.
Android developers who want to get started with Kotlin', N'Create professional applications using Kotlin, the new Java-based programming language developed by Jetbrains
Understand the concepts of the Kotlin language and how it integrates neatly with Java
Understand the basics of object-oriented software development, the most important development paradigm
Understand the principles behind other object-oriented languages like Java, C++, PHP, C#, Scala, or Swift
Use Intellij, the popular Java (and Kotlin) IDE, to write code effectively and professionally', NULL, 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://images.viblo.asia/2185d41e-6e40-42ba-8464-201b818bee58.png', CAST(N'2022-02-24T22:48:43.257' AS DateTime), NULL, NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10017, 3, N'React Native', N'Take you coding to the next level with React Native.', N'Do you want to learn the whole process of building an App ?. This is the course for you.

We will start from the very beginning, from "I don''t even know how to install it“ to actually understanding how React Native works and make it communicate with other technologies like Firebase and Redux.

You will learn all the logic and practice behind React Native  in different modules, and as we advance through the course we will be increasing the difficulty.

Since I believe that the best way to fully learn is by coding, after each important section we will put everything in practice with a very large practice project, using third party libraries, firebase and redux.', N'Knowing a little bit of Javascript ES5, we will use ES6 but you can learn it as we go.', N'From beginners in javascript to intermediate.', N'You will learn the whole React Native building process, from your pc to your phone.
Work with RNative and nosql databases like firebase.
Learn how Redux works and apply it on React Native', NULL, 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://www.appcoda.com/wp-content/uploads/2015/04/react-native.png', CAST(N'2022-02-24T22:48:43.257' AS DateTime), NULL, NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10018, 4, N'Unity', N'Learn Unity in C# & Code Your First Five 2D Video Games for Web, Mac & PC. The Tutorials Cover Tilemap', N'The course has recently been remastered in Unity 2021.1.

This course started as a runaway success on Kickstarter and has gone on to become the most popular and most watched Unity game development course on Udemy. The course has full English closed-captions throughout.

Learn how to create video games using Unity, the world-leading free-to-use game development tool. We start super simple so you need no prior experience of Unity or coding! With our online tutorials, you''ll be amazed what you can achieve right from the first moment you start the course. ', N'Mac or PC capable of running Unity 2019 or later.
A passion and willingness to learn how to code.', N'Competent and confident with using a computer.
Some programming experience helpful, but not required.
Artists who want to learn to bring their assets into games.
Complete beginners who are willing to work hard.
Developers who want to re-skill across to game development.', N'Learn C#, a powerful modern language, from scratch. No prior programming experience is necessary.
Become excellent at using the Unity game engine.
Build a solid foundation for game design and game development that will help you build your own games.
Learn how object oriented programming works in practice.
Create playable game projects - good for your portfolio, or just for your own sense of achievement.
Transfer your knowledge from this course to .NET, other languages, and more.
Develop highly transferable coding problem solving skills.
Be part of an amazing and supportive community of people similar to you.', NULL, 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://gocnhintangphat.com/unity-la-gi/imager_1_5279_700.jpg', CAST(N'2022-02-24T22:48:43.257' AS DateTime), NULL, NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10019, 4, N'Unreal Engine', N'Learn Video Game Development & How To Design a Game From Scratch Using UE5', N'Learn game development with Unreal Engine 5. UE5 is the industry-leading 3D game design software that the professionals use to create today’s top games. Start your journey towards getting paid to make video games today!



Learn Video Game Development with this Unreal Engine 5 Course for Beginners

Begin your game development career with possibly the most up-to-date game dev course on the internet - Unreal Engine 5: The Complete Beginner''s Course. Every lecture in this course was filmed using version 5 of the Engine.

When I began trying to learn Unreal Engine, I found a lot of information, but it was unstructured and lacked detail. So I created this course to provide what others lacked - structure and detail. The course is laid out very carefully so that you can go into it knowing absolutely nothing, and then, little by little, each lecture builds upon the previous lectures, so that every time you learn something new, you already have all the knowledge you need to learn that new thing without any confusion.

Unlike other courses, it covers the fundamentals in detail, so by the end you should have a thorough understanding of all the basics of Unreal Engine and be fully prepared to move on to more intermediate topics. Depending on your goals, this might not be for you. This course was designed for those who want to learn as much about Unreal Engine 5 as possible. If you’re just looking to have a bit of fun and to tinker around a little bit, then this might not be the right course for you. But, if you’re interested in getting really good, possibly becoming an indie developer or even working for a major studio, then I strongly believe that this is the best course for you to start with. This course will teach you the knowledge that normally falls through the cracks.', N'Recommended: Desktop PC with Windows 7 (or later) 64-bit or a Mac with Mac OS X 10.9.2 or later
Recommended: 8 GB RAM
Recommended: Quad-core Intel or AMD processor, 2.5 GHz or faster
Recommended: DirectX 11 compatible video card
Unreal Engine 5 will run on desktops and laptops with specifications under these, but performance may be affected', N'This video game development course is for absolute beginners who are interested in making games & learning how to design a game from scratch using UE5
Designed for those who want to become professionals using Unreal Engine 5
No programming experience required', N'Learn game development using Unreal Engine 5
Build realistic looking environments for games to take place in
Define custom inputs and movements to control characters
Script logic to define gameplay without needing to know how to code', NULL, 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'http://localhost:8080/images/Unreal Engine.png', CAST(N'2022-02-24T22:48:43.257' AS DateTime), CAST(N'2022-03-13T02:01:18.367' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10020, 4, N'Game Development Fundamentals', N'Recommended: Desktop PC with Windows 7 (or later) 64-bit or a Mac with Mac OS X 10.9.2 or later
Recommended: 8 GB RAM
Recommended: Quad-core Intel or AMD processor, 2.5 GHz or faster
Recommended: DirectX 11 compatible video card
Unreal Engine 5 will run on desktops and laptops with specifications under these, but performance may be affected', N'Unity Game Development Academy by Devslopes

This is the most comprehensive course on Unity 3d on the Internet. We are avid game developers and were tired of all the junk out there - teaching students how to make 3D cubes without real world game development.

This Unity course is for absolute beginners & for seasoned programmers!

This course will take you down a guided learning path. You''ll learn to code in C# and then go on to build 2D & 3D games.

Not only will you build games, but you will learn how to do it the way the pros do. We''ll even cover advanced topics like lighting, cinematics, and multiplayer.', N'Must have a Mac or PC for Unity game development
No prior coding experience required or experience in Unity 3D', N'Beginners with no coding experience or Unity 3D experience
Programmers with no C# development experience
Game developers who want to learn Unity
Anyone who wants to learn Unity game development but doesn''t know where to start', N'Build 2D Unity games & work with sprites
Build 3D Unity games
Write programs in C#
Apply for Jr. Game Developer jobs as a Unity 3D developer', NULL, 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://dospace.org/wp-content/uploads/2021/05/Fundamentals-of-Game-Development.jpeg', CAST(N'2022-02-24T22:48:43.257' AS DateTime), NULL, NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10022, 4, N'C++', N'Complete Beginners
No really, if you can type, install a program using a wizard, and open the file explorer you are good to go!', N'Save your precious time by buying this course. You will learn how to program in C++ in a fast and easy way! 

The total length of the course is over 17 hours! You will learn theory and you will also gain lots of practice. During the course we will write many programs that will make you a great programmer.

All of this is presented by a young man who shares his knowledge, so the language used can be easily understood by everyone. 

The course is designed for those who don''t have any prior knowledge about programming. It doesn''t matter if you have never written any programs or you have no idea about programming... After my course all of this will change. You will bust the myth that programming is a difficult thing only for the few!   

After this course you will be able to use the advanced components of the C++ language. 

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 

I believe that everyone has the ability to develop software if they are taught properly. Including you. I''m going to give you the context of each new concept I teach you. After my course you will finally understand everything that you code.', N'English language
Code::Blocks IDE (free)', N'beginner
person who wants to understand programming', N'How to use C++ language in action
What is compiler / IDE / Variables / types of variables etc.
How to work with files - fstream library (i/o operation on files)
operators - arithmetic, assigment, logical, bitwise
conditions like if / else / switch
arrays / multi-dimensional arrays
loops - for / while / do-while
functions, overloading functions, passing variables to functions etc.
structures
referencers
pointers
dynamic allocation of memory
creating project in IDE
classes
object oriented programming
class and function templates
namespaces
exceptions
input / output streams and validation of data
', NULL, 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://dospace.org/wp-content/uploads/2021/05/Fundamentals-of-Game-Development.jpeg', CAST(N'2022-02-24T22:48:43.257' AS DateTime), NULL, NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10023, 5, N'SQL', N'Using MySQL but applicable to Oracle SQL, Microsoft SQL Server, and PostgreSQL. Taught by a Data Scientist and PM.', N'If you have no technical background, don''t be afraid! We''ve distilled our knowledge and experience using SQL into a short course so that by the end, you''ll have the raw skills to do some real data analysis for your company using SQL - a language virtually EVERY company uses. Note: this courses teaches you real-world SQL - not just the theory in abstract, but real skills you can use to get more data-driven in your current job. ', N'No previous technical knowledge required', N'Marketers
Startup folks
Non-technical folks
Aspiring Data Analysts
Recent College Grads
Job-seekers
Product Managers', N'If you have no technical background, don''t be afraid! We''ve distilled our knowledge and experience using SQL into a short course so that by the end, you''ll have the raw skills to do some real data analysis for your company using SQL - a language virtually EVERY company uses. Note: this courses teaches you real-world SQL - not just the theory in abstract, but real skills you can use to get more data-driven in your current job. ', NULL, 0, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://dospace.org/wp-content/uploads/2021/05/Fundamentals-of-Game-Development.jpeg', CAST(N'2022-02-24T22:48:43.257' AS DateTime), CAST(N'2022-03-13T04:24:41.577' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10024, 5, N'Oracle SQL', N'Marketers
Startup folks
Non-technical folks
Aspiring Data Analysts
Recent College Grads
Job-seekers
Product Managers', N'* Covers Oracle Database 11g, Oracle 12c, Oracle 18c, and Oracle 19c

Oracle is currently the most popular relational database management system in the world. It is used by thousands of big companies who are usually willing to pay good salaries to the right people, which includes those with practical Oracle SQL knowledge that is based on best practices and experience.                    

Most SQL courses give you theoretical SQL knowledge. In this course, you will learn by actually writing code.', N'No prior Oracle SQL knowledge is required. You will learn Oracle SQL from scratch (if that is what you need).
If you want to install your own Oracle SQL database, you will need a computer running Windows or Linux, where you can install and run applications (A computer running Mac OS X can be used as well, but you will need to run your database software on a virtual machine).
You should have a real desire to learn Oracle SQL and time to watch the lectures and practice the concepts as suggested by the instructor.', N'Aspiring application or database developers looking to acquire solid SQL knowledge to improve their careers.
College/University students who need SQL knowledge to pass their database-related courses.
Anyone with only basic SQL knowledge wanting to solidify their skill and use the language with confidence.
This course is not for you if you are already an experienced Oracle SQL developer looking to learn the most advanced features of the language.
This course is not for you if you are looking for a theoretical course.', N'You will be able to use Oracle SQL to retrieve, filter, analyze, format and present information from Oracle databases.
You will be able to use SQL to insert, modify and delete information from Oracle databases.
You will understand Oracle SQL code written by other people and feel confident to modify it.
You will be able to write the SQL code needed to solve the most common problems found in real work situations and academic tests.
Please note that PL/SQL is not covered in this course.', NULL, 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://dospace.org/wp-content/uploads/2021/05/Fundamentals-of-Game-Development.jpeg', CAST(N'2022-02-24T22:48:43.257' AS DateTime), NULL, NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10025, 5, N'Database Management', N'Learn Database Management Systems from scratch as Database Management System forms the core of computer science', N'Welcome to the course Database Management system from scratch !!!

Mastering the concepts of Database Management System is very important to get started with Computer Science because Database Management System is the program which is responsible for the ease with which we are able to fetch the data from the database and that is the backbone of internet today. The concepts which we are going to study is going to give a very good understanding of Database Management System and by the end of it you will be able to answer any interview question on Database Management System.

Without using Database Management Systems ,it is extremely difficult to communicate with the data in the server. Every server today has Database Management System installed in it. Through this course you will not only master the basics of Database Management Systems but also get ready for venturing into advanced concepts of Database Management Systems.

In this course ,every concept of Database Management System is taught in an easy-to-understand manner such that anybody without any prerequisites will be able to master the concepts of Database Management System in the easiest way.

Come and join me, I assure you that you will have the best learning experience of not just Database Management Systems but also the core of Computer Science in a different dimension.', N'Have a PC with internet connection
Even ZERO knowledge in Database Management Systems is fine - I''ll teach you everything you need to know', N'Anybody who needs to learn Database Management System from scratch
Anybody who wants to pursue a career in Computer Science
Anybody who has Database Management System in the Bachelor''s degree
Anybody who is preparing for interview in product based companies
If you are preparing for exams like GATE , PGEE , BITS HD , ISRO ,..etc
If you are a Computer Science Engineer', N'You will become very familiar with the core concepts of Database Management Systems
You will be able to challenge the interviewer on questions related to Database Management Systems
You will view Computer Science in a different dimension
You will be able to answer all questions of exams like GATE,PGEE,ISRO
You will be able to get a top grade in your Database Management Systems course in your Bachelor''s degree', NULL, 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://dospace.org/wp-content/uploads/2021/05/Fundamentals-of-Game-Development.jpeg', CAST(N'2022-02-24T22:48:43.257' AS DateTime), NULL, NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10026, 5, N'SQL Server', N'Have a PC with internet connection
Even ZERO knowledge in Database Management Systems is fine - I''ll teach you everything you need to know', N'You learned a little SQL, but you are ready to take the next step and really understand how databases work. Or maybe you are a complete beginner. Here’s a little secret. It’s not that complicated. That’s right. Databases are actually a very simple concept that starts with a simple Table just like a spreadsheet in Excel. Everything else in the database is built around this little concept of a table.

With a little SQL Server knowledge, you can retrieve data yourself. You can automate your reporting. You can help management find information and troubleshoot problems. You can even transfer this knowledge to Oracle and MySQL.

In this course, veteran consultant, Joey Blue, takes you through the essentials of SQL Server right through advanced topics such as backups, security, and indexes. This course is recommended for all business and IT professionals that want to advance their careers by understanding their corporate database.', N'PC (Desktop or Laptop)
SQL Server Developer (FREE Edition)
Browser and Internet Connection', N'Business Analysts
IT Professional
Business Professional
Accountants
Web Developers
Managers
Software Developers
Programming Students
Financial Analysts
Process Engineers
Anyone interested in understanding data and databases.', N'By the end of the course, you will have a foundation in SQL Server and the vocabulary and understanding to talk about and use SQL Server with confidence.
You will know how to navigate SQL Server Management Studio (SSMS) to find database objects and business data.
You will understand how to take advantage of Management Studio to make you work faster and more efficient.
You will understand the different pieces in SQL Server. Including, Tables, Views, Stored Procedures, Security, Backups, Indexes and Schemas to help you talk to DBA''s, Programmers, IT and to sound smart when you are speaking about databases.
You will know how to write SQL statements to CREATE, Retrieve, Update, and Delete data.
You will be able to create basic Views and Stored Procedures.
You will be able to Filter, Join, Sort, and Group data.
You will be able to create basic Views, Stored Procedures, and Functions.
You will have foundational knowledge in Security, Backups, and Indexes', NULL, 1, CAST(100 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'https://dospace.org/wp-content/uploads/2021/05/Fundamentals-of-Game-Development.jpeg', CAST(N'2022-02-24T22:48:43.257' AS DateTime), NULL, NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10029, 11, N'An Entire MBA', N'** #1 Best ', N'** #1 MOST PURCHASED BUSINESS COURSE ON UDEMY! ** OVER 400,000 STUDENTS IN 195 COUNTRIES ** 

** ACCORDING TO BUSINESS INSIDER: "Getting your MBA has never been easier. Haroun is one of the highest rated professors on Udemy, so you can expect to be in good hands through the course of your education." **

**  FREE 384 PAGE MBA BOOK INCLUDED. In order to further improve the student experience, there is a free download at the end of every section of this course (contains every slide & entire easy to read comprehensive scripts of all 49 lectures & >100 helpful internet links + more) keeping the course up to date, even easier to understand & even more fun and engaging! **

Are you ready to take your career to the next level? In this course, you will learn everything you need to know about business….from starting a company to taking it public. This course covers all of the important topics you will learn from getting an MBA from a top school + real life practical business concepts that will help make you more successful!

This course is taught by an award winning MBA professor with significant real world experience working at Goldman Sachs as well as in the venture capital, hedge fund and consulting industries (he has founded several companies and sits on several boards). Many business concepts are simply common sense', N'Nothing except a positive attitude! : )', N'Anyone interested in learning about business (only practical concepts that you can use and no boring theory + we won''t cover business topics that are common sense).', N'Over 400,000 students in 195 countries!
Superb reviews!
Free 384 page book version of this course included!
Take your career to the next level!
Launch a company from scratch.
Get any job the easy way.
Get many customers by using the best networking tool!
Raise a lot of money quickly.
Create financial models from scratch (the Professor makes it so easy to understand).
Analyze company financials with ease!
Understand how investment banking firms work and what they can do to help your business.
Understand how management consulting firms work and when you need to hire them.
Understand how macro economics and micro economics works.
Understand what is venture capital and how to partner with the top venture capital firms to take your company to the next level.
Present to investors and customers like a boss : )
Communicate the right way in business so that you don''t waste time.
Change careers easily.
Network and get a meeting with anyone (ideal tips on how to get a job or how to reinvent yourself or how to find customers).
Analyze entire markets and companies from a qualitative and quantitative perspective.
Understand how taxes work (don''t worry this section is not boring)!
Protect your family and assets in case your business gets sued.
Understand what business career makes most sense for you!
Restructure your company and the benefits of declaring bankruptcy protection if needed.
Partner with equity and debt providers.
After this course you will have the tools / skills needed to launch a company, grow it and then take it public!
Value companies the easy way.
Set up the correct and most beneficial legal entity for your company.
Identify what makes an entrepreneur extremely successful.
Set unbelievable goals for yourself (there are no limits to what you can achieve....)!', NULL, 1, CAST(22 AS Decimal(18, 0)), N'11', N'ENG', N'https://www.youtube.com/embed/YwXqVpf4ZJc', N'https://dospace.org/wp-content/uploads/2021/05/Fundamentals-of-Game-Development.jpeg', CAST(N'2022-03-02T18:44:05.637' AS DateTime), CAST(N'2022-03-02T18:44:05.637' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10030, 13, N'Sales and Relationship Management in Financial Services', N'** #1 Best Selling Business Course! ** Everything You Need to Know About Business from Start-up', N'Sales is part of every job today, internal and external. This course will orient you on sales and relationship management, a very important aspect of business - one that going forward, will help you in your career. This serves as an introduction to sales, relationship management and the importance of both in banking and services. 

This course covers the following topics, in three sections. First, an introduction to the importance of sales and relationship management is given. Then, covering the Sales aspect: ', N'Knowledge of the English language.', N'All levels of audience are encouraged to participate in this course.', N'You''ll learn the key principles of sales and relationship management
You''ll learn how to optimize your sales strategy
You''ll learn how to perform excellent relationship management with clients
You''ll learn how to manage negative relationships and overcome barriers
You''ll learn why sales and relationship management are important to all industries
', NULL, 1, CAST(111 AS Decimal(18, 0)), N'10', N'ENG', N'https://www.youtube.com/embed/Z2x_Z3ZZC2U', N'http://localhost:8080/images/sale.jpg', CAST(N'2022-03-02T18:54:33.693' AS DateTime), CAST(N'2022-03-13T01:55:05.470' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10031, 6, N'Web Design for Beginners: Real World Coding in HTML & CSS', N'** #1 Best ', N'You can launch a new career in web development today by learning HTML & CSS. You don''t need a computer science degree or expensive software. All you need is a computer, a bit of time, a lot of determination, and a teacher you trust. I''ve taught HTML and CSS to countless coworkers and held training sessions for fortune 100 companies. I am that teacher you can trust. 

Don''t limit yourself by creating websites with some cheesy “site-builder" tool. This course teaches you how to take 100% control over your webpages by using the same concepts that every professional website is created with.

This course does not assume any prior experience. We start at square one and learn together bit by bit. By the end of the course you will have created (by hand) a website that looks great on phones, tablets, laptops, and desktops alike.

In the summer of 2020 the course has received a new section where we push our website live up onto the web using the free GitHub Pages service; this means you''ll be able to share a link to what you''ve created with your friends, family, colleagues and the world!', N'No prerequisite knowledge required
No special ($$$) software required', N'Anyone who wants to build websites the "professional" way
Anyone who has practiced web design as a hobby but is not confident about their skillset in a professional arena
Experienced developers looking to renew their HTML5 & CSS3 knowledge', N'Create any website layout you can imagine
Support any device size with Responsive (mobile-friendly) Design
Add tasteful animations and effects with CSS3', NULL, 1, CAST(120 AS Decimal(18, 0)), N'1', N'ENG', N'https://youtu.be/embed/1JaTQa0lyiE?t=5', N'http://localhost:8080/images/Web Design.jpg', CAST(N'2022-03-07T23:03:39.047' AS DateTime), CAST(N'2022-03-13T02:09:13.020' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10032, 12, N'Improve Communication: Speak Smoothly, Clearly & Confidently', N'Improve Communication: Speak Smoothly, Clearly & Confidently', N'How to Improve Communication Skills  (Major Updates Coming Soon!)

Do you struggle with getting your words out when explaining things in important situations, situations like interviews, presentations, meetings, phone or video conferences?  Do you become anxious, nervous tense up, loose track of where you''re at, speak too fast, or even stutter?  Do people sometimes have trouble understanding you because English is your second language? 

If you answered yes to any of the above, relax…help is finally here!  My name is Michael Williams and I stuttered for over 20 years.  For the past two decades I''ve made my living speaking.  I teach academic success as a professor, have conducted day-long and multi-day relationship and communication retreats, taught in churches, spoke on live T.V., radio and much more.  I''ve even taught small classes in Spanish.  I now work with people from all around the world helping them learn to speak more smoothly, fluently, clearly and confidently.  I call this type of speech "Proactive."  Eventually, I created a step-by-step process for becoming a Proactive Speaker and I call this the PR90D Speech System. ', N'If you are willing to work hard, and stick with this until you see results, you have the prerequisites for this course.
This course does NOT have a written transcript. You should be able to sufficiently understand spoken English if you decide to take this course.', N'This course is for you if you struggle getting your thoughts and words to sync up.
This course is for you if you get nervous or anxious before and during public speaking situations.
This course is for you if you stutter.
This course is for you if English is your second language and believe your career would be better if you improved your communication skills.', N'Learn to speak more smoothly so that both you and those to whom you are speaking feel relaxed, tuned in, and focused.
Learn to speak more fluently so that your thoughts and words stream together in sync helping you present your thoughts and ideas in an intelligent and precise manner.
Learn to speak more clearly so that your listeners can understand exactly what you''re saying and what you mean.
Learn to speak more confidently so that your listeners like and trust you, and therefore believe what you are saying.', NULL, 1, CAST(122 AS Decimal(18, 0)), N'1', N'FR', N'https://youtu.be/1JaTQa0lyiE?t=5', N'http://localhost:8080/images/Best-Free-Online-Communication-Courses-1.jpg', CAST(N'2022-03-07T23:05:25.697' AS DateTime), CAST(N'2022-03-13T01:50:40.773' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10033, 21, N'Accounting & Bookkeeping Courses', N'** #1 Best ', N'Are You An Entrepreneur or Small Business Owner?

Does Accounting Seem Overwhelming? 

Do Numbers And Financial Reports Confuse You?

Would You Like To Learn Accounting & Finance in a Fun & Easy Way?

If You Answered "Yes" To Any Of The Above, Look No Further.  This Is The Course For You!

*** Updated in January 2022 with new content! ***

Enroll today and join the 100,000+ successful students I have taught as a Top Rated Udemy instructor!', N'Desire to learn accounting & finance
Access to Excel or other spreadsheet program
Passion to empower yourself with knowledge
Commitment to learning
Description', N'Are You An Entrepreneur or Small Business Owner?

Does Accounting Seem Overwhelming? 

Do Numbers And Financial Reports Confuse You?

Would You Like To Learn Accounting & Finance in a Fun & Easy Way?

If You Answered "Yes" To Any Of The Above, Look No Further.  This Is The Course For You!

*** Updated in January 2022 with new content! ***

Enroll today and join the 100,000+ successful students I have taught as a Top Rated Udemy instructor!', N'Learn From A Top Rated Instructor Who Has Been Teaching On Udemy Since 2013 and Taught Over 100,000 Students!
Understand Basic Accounting Concepts
Accounting Terminology
Accounting Fundamentals
The Audit Process
The Accounting Cycle
Debits and Credits
Accounts Receivable', NULL, 1, CAST(120 AS Decimal(18, 0)), N'12', N'ENG', N'https://www.youtube.com/embed/r92t759BlLQ', N'http://localhost:8080/images/Accounting & Bookkeeping Courses.jpg', CAST(N'2022-03-09T18:20:04.873' AS DateTime), CAST(N'2022-03-13T02:11:29.843' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10034, 14, N'How To Write A Business Plan And A Winning Business Model', N'** #1 Best ', N'Revolutionary, new way to write a professional business plan that will help you identify the most effective business strategies for your situation.

Take this step to start your business, achieve independence, and become your own boss.', N'Revolutionary, new way to write a professional business plan that will help you identify the most effective business strategies for your situation.

Take this step to start your business, achieve independence, and become your own boss.', N'Aspiring entrepreneurs who are writing a business plan - be your own boss, start a business, and reach great potential', N'Revolutionary, new way to write a professional business plan that will help you identify the most effective business strategies for your situation.

Take this step to start your business, achieve independence, and become your own boss.', NULL, 1, CAST(111 AS Decimal(18, 0)), N'11', N'ENG', N'http://www.localhost:3000/add-course', N'http://localhost:8080/images/Business Strategy Courses.jpg', CAST(N'2022-03-09T19:20:15.203' AS DateTime), CAST(N'2022-03-13T01:58:22.297' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10035, 22, N'Draw', N'Draw', N'Draw', N'Draw', N'Draw', N'Draw', NULL, 1, CAST(100 AS Decimal(18, 0)), N'1', N'VN', N'https://www.youtube.com/embed/ewMksAbgdBI', N'http://localhost:8080/images/drawing.jpg', CAST(N'2022-03-13T08:21:38.467' AS DateTime), CAST(N'2022-03-13T08:21:38.467' AS DateTime), NULL)
INSERT [dbo].[Course] ([id], [subcatalog_id], [title], [short_description], [description], [requirement], [who_this_course_is_for], [what_you_will_learn], [update_date], [activate], [price], [video_duration], [language], [url_video_description], [image_video_description], [created_date], [updated_date], [deleted_date]) VALUES (10036, 1, N'C basic', N'C basic', N'C basic', N'C basic', N'C basic', N'C basic', NULL, 1, CAST(111 AS Decimal(18, 0)), N'1', N'ENG', N'https://www.youtube.com/embed/ewMksAbgdBI', N'http://localhost:8080/images/CBasic.jpg', CAST(N'2022-03-13T09:02:37.543' AS DateTime), CAST(N'2022-03-13T09:02:37.543' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Course] OFF
GO
SET IDENTITY_INSERT [dbo].[Lecture] ON 

INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (1, 14, N'Javascript for Beginners', 1, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'150', 0, CAST(N'2022-02-08T20:44:38.583' AS DateTime), NULL, NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (2, 8, N'Intro', 2, N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'150', 1, CAST(N'2022-02-08T20:44:38.600' AS DateTime), NULL, NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (3, 9, N'Variable', 3, N'https://www.youtube.com/embed/k5E2AVpwsko', N'150', 0, CAST(N'2022-02-08T20:44:38.613' AS DateTime), NULL, NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (4, 10, N'Conditional Statements', 3, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'150', 0, CAST(N'2022-02-08T20:44:38.617' AS DateTime), CAST(N'2022-03-02T17:12:11.940' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (5, 10, N'Dialog Boxes', 1, N'https://www.youtube.com/embed/R6plN3FvzFY?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz', N'150', 0, CAST(N'2022-02-08T20:58:45.233' AS DateTime), CAST(N'2022-03-02T17:12:19.687' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (6, 11, N'Arrays', 1, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'150', 0, CAST(N'2022-02-08T20:58:45.257' AS DateTime), NULL, NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (7, 12, N'String Object', 2, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'150', 0, CAST(N'2022-02-08T20:58:45.260' AS DateTime), NULL, NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (8, 12, N'Document Object', 3, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'150', 0, CAST(N'2022-02-08T20:58:45.263' AS DateTime), CAST(N'2022-03-02T17:12:31.270' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (9, 12, N'Functions', 1, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'150', 0, CAST(N'2022-02-22T18:47:49.133' AS DateTime), CAST(N'2022-02-22T18:47:49.133' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (10, 12, N'Lab Solutions', 2, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'150', 0, CAST(N'2022-02-22T18:47:49.140' AS DateTime), CAST(N'2022-02-22T18:47:49.140' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (11, 12, N'Bonus', 3, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'150', 0, CAST(N'2022-02-22T18:47:49.153' AS DateTime), CAST(N'2022-02-22T18:47:49.153' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (12, 13, N'Project', 1, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'150', 0, CAST(N'2022-02-22T18:47:49.153' AS DateTime), CAST(N'2022-02-22T18:47:49.153' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (13, 13, N'Testing', 2, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'150', 0, CAST(N'2022-02-24T22:42:46.690' AS DateTime), CAST(N'2022-02-24T22:42:46.690' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (30, 19, N'Intro video', 1, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'11', 0, CAST(N'2022-03-02T18:44:05.647' AS DateTime), CAST(N'2022-03-02T18:44:05.647' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (31, 19, N'Intro video 2', 2, N'https://www.youtube.com/embed/Z2x_Z3ZZC2U', N'11', 0, CAST(N'2022-03-02T18:44:05.647' AS DateTime), CAST(N'2022-03-02T18:44:05.647' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (32, 20, N'Begin 1', 1, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'1', 0, CAST(N'2022-03-02T18:44:05.650' AS DateTime), CAST(N'2022-03-02T18:44:05.650' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (33, 21, N'Lecture course 1', 1, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'11', 0, CAST(N'2022-03-02T18:47:58.660' AS DateTime), CAST(N'2022-03-02T18:47:58.660' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (34, 22, N'lecture1', 1, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'1', 0, CAST(N'2022-03-02T18:54:33.700' AS DateTime), CAST(N'2022-03-02T18:54:33.700' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (35, 23, N'lecture2', 1, N'https://www.youtube.com/embed/Z2x_Z3ZZC2U', N'1', 0, CAST(N'2022-03-02T18:54:33.703' AS DateTime), CAST(N'2022-03-02T18:54:33.703' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (36, 24, N'aa', 1, N'https://www.youtube.com/embed/IkilN6S2fec', N'1', 1, CAST(N'2022-03-07T23:05:25.720' AS DateTime), CAST(N'2022-03-07T23:08:56.340' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (37, 24, N'aas', 2, N'https://youtu.be/1JaTQa0lyiE?t=5', N'1', 0, CAST(N'2022-03-07T23:05:25.723' AS DateTime), CAST(N'2022-03-07T23:05:25.723' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (38, 25, N'aa', 1, N'https://youtu.be/1JaTQa0lyiE?t=5', N'1', 0, CAST(N'2022-03-07T23:05:25.727' AS DateTime), CAST(N'2022-03-07T23:05:25.727' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (39, 24, N'as', 3, N'https://youtu.be/1JaTQa0lyiE?t=5', N'1', 0, CAST(N'2022-03-07T23:06:42.743' AS DateTime), CAST(N'2022-03-07T23:06:42.743' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (40, 28, N'l1', 1, N'https://www.youtube.com/embed/r92t759BlLQ', N'11', 1, CAST(N'2022-03-09T18:20:56.373' AS DateTime), CAST(N'2022-03-13T02:06:01.300' AS DateTime), CAST(N'2022-03-13T02:06:01.293' AS DateTime))
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (41, 30, N'saa', 1, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'1', 0, CAST(N'2022-03-09T19:20:42.783' AS DateTime), CAST(N'2022-03-09T19:21:58.083' AS DateTime), CAST(N'2022-03-09T19:21:58.080' AS DateTime))
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (42, 30, N'ww', 2, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'22', 0, CAST(N'2022-03-09T19:20:50.170' AS DateTime), CAST(N'2022-03-09T19:21:58.083' AS DateTime), CAST(N'2022-03-09T19:21:58.080' AS DateTime))
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (43, 7, N'Introduce', 1, N'https://youtu.be/embed/x0fSBAgBrOQ?list=PL_-VfJajZj0UXjlKfBwFX73usByw3Ph9Q', N'1', 0, CAST(N'2022-03-13T02:16:14.163' AS DateTime), CAST(N'2022-03-13T02:16:14.163' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (44, 7, N'How to get help', 2, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'1', 0, CAST(N'2022-03-13T02:17:14.743' AS DateTime), CAST(N'2022-03-13T02:17:14.743' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (45, 32, N'SPA/MPA', 1, N'https://youtu.be/embed/30sMCciFIAM?list=PL_-VfJajZj0UXjlKfBwFX73usByw3Ph9Q', N'1', 0, CAST(N'2022-03-13T02:17:44.590' AS DateTime), CAST(N'2022-03-13T02:17:48.320' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (46, 33, N'Lets start', 1, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'12', 0, CAST(N'2022-03-13T02:18:28.287' AS DateTime), CAST(N'2022-03-13T02:18:28.287' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (47, 34, N'lecture 1', 1, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'9', 0, CAST(N'2022-03-13T08:21:38.497' AS DateTime), CAST(N'2022-03-13T08:21:38.497' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (48, 34, N'lecture 2', 2, N'https://www.youtube.com/embed/IkilN6S2fec', N'12', 1, CAST(N'2022-03-13T08:21:38.497' AS DateTime), CAST(N'2022-03-13T08:21:38.497' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (49, 35, N'lecture 1', 1, N'https://www.youtube.com/embed/0SJE9dYdpps?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5', N'1', 1, CAST(N'2022-03-13T09:02:37.547' AS DateTime), CAST(N'2022-03-13T09:02:37.547' AS DateTime), NULL)
INSERT [dbo].[Lecture] ([id], [lesson_id], [title], [sort], [video_url], [video_duration], [preview], [created_date], [updated_date], [deleted_date]) VALUES (50, 36, N'lecture 2', 1, N'https://www.youtube.com/embed/IkilN6S2fec', N'1', 0, CAST(N'2022-03-13T09:02:37.550' AS DateTime), CAST(N'2022-03-13T09:02:37.550' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Lecture] OFF
GO
SET IDENTITY_INSERT [dbo].[Lesson] ON 

INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (7, 2, N'Javascript for Beginners', CAST(N'2022-02-22T18:47:49.150' AS DateTime), CAST(N'2022-02-22T18:47:49.150' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (8, 1, N'Intro', CAST(N'2022-02-24T22:42:46.673' AS DateTime), CAST(N'2022-02-24T22:42:46.673' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (9, 1, N'Variable', CAST(N'2022-02-24T22:42:46.697' AS DateTime), CAST(N'2022-02-24T22:42:46.697' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (10, 1, N'Conditional Statements', CAST(N'2022-02-24T22:48:18.740' AS DateTime), CAST(N'2022-02-24T22:48:18.740' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (11, 1, N'Project', CAST(N'2022-02-24T22:48:18.750' AS DateTime), CAST(N'2022-02-24T22:48:18.750' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (12, 1, N'Bonus', CAST(N'2022-02-24T22:48:43.267' AS DateTime), CAST(N'2022-02-24T22:48:43.267' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (13, 1, N'Testing', CAST(N'2022-02-24T22:48:43.277' AS DateTime), CAST(N'2022-02-24T22:48:43.277' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (14, 1, N'Javascript for Beginners', CAST(N'2022-03-02T16:55:54.900' AS DateTime), CAST(N'2022-03-02T16:55:54.900' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (19, 10029, N'Intro', CAST(N'2022-03-02T18:44:05.643' AS DateTime), CAST(N'2022-03-02T18:44:05.643' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (20, 10029, N'Begin', CAST(N'2022-03-02T18:44:05.647' AS DateTime), CAST(N'2022-03-02T18:44:05.647' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (21, 10029, N'Course 1', CAST(N'2022-03-02T18:46:48.907' AS DateTime), CAST(N'2022-03-02T18:46:48.907' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (22, 10030, N'Introduce', CAST(N'2022-03-02T18:54:33.697' AS DateTime), CAST(N'2022-03-13T01:55:24.737' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (23, 10030, N'lesson2', CAST(N'2022-03-02T18:54:33.703' AS DateTime), CAST(N'2022-03-02T18:54:33.703' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (24, 10032, N'as', CAST(N'2022-03-07T23:05:25.713' AS DateTime), CAST(N'2022-03-07T23:05:25.713' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (25, 10032, N'bs', CAST(N'2022-03-07T23:05:25.727' AS DateTime), CAST(N'2022-03-07T23:05:25.727' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (26, 10032, N'aa', CAST(N'2022-03-07T23:06:09.433' AS DateTime), CAST(N'2022-03-07T23:06:09.433' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (27, 10032, N'asaas', CAST(N'2022-03-07T23:06:25.687' AS DateTime), CAST(N'2022-03-07T23:06:25.687' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (28, 10033, N'a1', CAST(N'2022-03-09T18:20:31.420' AS DateTime), CAST(N'2022-03-13T02:06:01.297' AS DateTime), CAST(N'2022-03-13T02:06:01.293' AS DateTime))
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (29, 10033, N'a2', CAST(N'2022-03-09T18:20:37.743' AS DateTime), CAST(N'2022-03-13T02:06:01.300' AS DateTime), CAST(N'2022-03-13T02:06:01.293' AS DateTime))
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (30, 10034, N'aaaa', CAST(N'2022-03-09T19:20:34.930' AS DateTime), CAST(N'2022-03-09T19:21:58.083' AS DateTime), CAST(N'2022-03-09T19:21:58.080' AS DateTime))
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (31, 10034, N'aaaaaaaaaaaaaaa', CAST(N'2022-03-09T19:21:19.123' AS DateTime), CAST(N'2022-03-09T19:21:59.803' AS DateTime), CAST(N'2022-03-09T19:21:59.803' AS DateTime))
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (32, 2, N'Building Content', CAST(N'2022-03-13T02:16:56.490' AS DateTime), CAST(N'2022-03-13T02:16:56.490' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (33, 2, N'Comunication with Props', CAST(N'2022-03-13T02:18:14.220' AS DateTime), CAST(N'2022-03-13T02:18:14.220' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (34, 10035, N'Introduce', CAST(N'2022-03-13T08:21:38.497' AS DateTime), CAST(N'2022-03-13T08:21:38.497' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (35, 10036, N'Lesson 1', CAST(N'2022-03-13T09:02:37.547' AS DateTime), CAST(N'2022-03-13T09:02:37.547' AS DateTime), NULL)
INSERT [dbo].[Lesson] ([id], [course_id], [title], [created_date], [updated_date], [deleted_date]) VALUES (36, 10036, N'Lesson 2', CAST(N'2022-03-13T09:02:37.550' AS DateTime), CAST(N'2022-03-13T09:02:37.550' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Lesson] OFF
GO
SET IDENTITY_INSERT [dbo].[Messages] ON 

INSERT [dbo].[Messages] ([id], [user_id], [conversation_id], [message], [responsed], [created_date], [updated_date], [deleted_date]) VALUES (3, 1, 1, N'Hello there', 1, CAST(N'2022-03-02T12:45:23.990' AS DateTime), CAST(N'2022-03-02T12:54:56.957' AS DateTime), NULL)
INSERT [dbo].[Messages] ([id], [user_id], [conversation_id], [message], [responsed], [created_date], [updated_date], [deleted_date]) VALUES (4, 2, 1, N'Hello User', 1, CAST(N'2022-03-02T12:45:26.797' AS DateTime), CAST(N'2022-03-02T12:54:39.183' AS DateTime), NULL)
INSERT [dbo].[Messages] ([id], [user_id], [conversation_id], [message], [responsed], [created_date], [updated_date], [deleted_date]) VALUES (5, 1, 1, N'I have problem', 1, CAST(N'2022-03-02T12:54:39.207' AS DateTime), CAST(N'2022-03-02T12:54:56.957' AS DateTime), NULL)
INSERT [dbo].[Messages] ([id], [user_id], [conversation_id], [message], [responsed], [created_date], [updated_date], [deleted_date]) VALUES (6, 2, 1, N'Yeah, let me know it', 1, CAST(N'2022-03-02T12:54:56.980' AS DateTime), CAST(N'2022-03-02T13:03:22.410' AS DateTime), NULL)
INSERT [dbo].[Messages] ([id], [user_id], [conversation_id], [message], [responsed], [created_date], [updated_date], [deleted_date]) VALUES (7, 7, 1, N'I have problem', 0, CAST(N'2022-03-02T13:03:22.420' AS DateTime), CAST(N'2022-03-02T13:03:22.420' AS DateTime), NULL)
INSERT [dbo].[Messages] ([id], [user_id], [conversation_id], [message], [responsed], [created_date], [updated_date], [deleted_date]) VALUES (8, 7, 2, N'I have problem', 0, CAST(N'2022-03-02T13:04:47.917' AS DateTime), CAST(N'2022-03-02T13:04:47.917' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Messages] OFF
GO
SET IDENTITY_INSERT [dbo].[OrderDetail] ON 

INSERT [dbo].[OrderDetail] ([id], [course_id], [order_id], [created_date], [updated_date], [deleted_date]) VALUES (27, 1, 109, CAST(N'2022-03-07T23:17:07.020' AS DateTime), CAST(N'2022-03-07T23:17:07.020' AS DateTime), NULL)
INSERT [dbo].[OrderDetail] ([id], [course_id], [order_id], [created_date], [updated_date], [deleted_date]) VALUES (28, 2, 110, CAST(N'2022-03-09T18:28:13.400' AS DateTime), CAST(N'2022-03-09T18:28:13.400' AS DateTime), NULL)
INSERT [dbo].[OrderDetail] ([id], [course_id], [order_id], [created_date], [updated_date], [deleted_date]) VALUES (29, 3, 110, CAST(N'2022-03-09T18:28:13.400' AS DateTime), CAST(N'2022-03-09T18:28:13.400' AS DateTime), NULL)
INSERT [dbo].[OrderDetail] ([id], [course_id], [order_id], [created_date], [updated_date], [deleted_date]) VALUES (30, 10003, 110, CAST(N'2022-03-09T18:28:13.400' AS DateTime), CAST(N'2022-03-09T18:28:13.400' AS DateTime), NULL)
INSERT [dbo].[OrderDetail] ([id], [course_id], [order_id], [created_date], [updated_date], [deleted_date]) VALUES (31, 10007, 111, CAST(N'2022-03-09T19:17:48.153' AS DateTime), CAST(N'2022-03-09T19:17:48.153' AS DateTime), NULL)
INSERT [dbo].[OrderDetail] ([id], [course_id], [order_id], [created_date], [updated_date], [deleted_date]) VALUES (32, 1, 112, CAST(N'2022-03-13T05:08:49.283' AS DateTime), CAST(N'2022-03-13T05:08:49.283' AS DateTime), NULL)
INSERT [dbo].[OrderDetail] ([id], [course_id], [order_id], [created_date], [updated_date], [deleted_date]) VALUES (33, 1, 113, CAST(N'2022-03-13T09:09:30.190' AS DateTime), CAST(N'2022-03-13T09:09:30.190' AS DateTime), NULL)
INSERT [dbo].[OrderDetail] ([id], [course_id], [order_id], [created_date], [updated_date], [deleted_date]) VALUES (34, 2, 114, CAST(N'2022-03-13T09:10:33.777' AS DateTime), CAST(N'2022-03-13T09:10:33.777' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[OrderDetail] OFF
GO
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([id], [order_number], [customer_id], [payment_id], [total_amount], [status_order], [date_order], [created_date], [updated_date], [deleted_date]) VALUES (109, N'ABC000973848', 2, 11, CAST(100 AS Decimal(18, 0)), 1, CAST(N'2022-03-07' AS Date), CAST(N'2022-03-07T23:17:07.017' AS DateTime), CAST(N'2022-03-07T23:17:07.017' AS DateTime), NULL)
INSERT [dbo].[Orders] ([id], [order_number], [customer_id], [payment_id], [total_amount], [status_order], [date_order], [created_date], [updated_date], [deleted_date]) VALUES (110, N'ABC000908573', 2, 12, CAST(300 AS Decimal(18, 0)), 1, CAST(N'2022-03-09' AS Date), CAST(N'2022-03-09T18:28:13.400' AS DateTime), CAST(N'2022-03-09T18:28:13.400' AS DateTime), NULL)
INSERT [dbo].[Orders] ([id], [order_number], [customer_id], [payment_id], [total_amount], [status_order], [date_order], [created_date], [updated_date], [deleted_date]) VALUES (111, N'ABC000272623', 2, 13, CAST(100 AS Decimal(18, 0)), 1, CAST(N'2022-03-09' AS Date), CAST(N'2022-03-09T19:17:48.147' AS DateTime), CAST(N'2022-03-09T19:17:48.147' AS DateTime), NULL)
INSERT [dbo].[Orders] ([id], [order_number], [customer_id], [payment_id], [total_amount], [status_order], [date_order], [created_date], [updated_date], [deleted_date]) VALUES (112, N'ABC000945866', 113, 14, CAST(100 AS Decimal(18, 0)), 1, CAST(N'2022-03-13' AS Date), CAST(N'2022-03-13T05:08:49.280' AS DateTime), CAST(N'2022-03-13T05:08:49.280' AS DateTime), NULL)
INSERT [dbo].[Orders] ([id], [order_number], [customer_id], [payment_id], [total_amount], [status_order], [date_order], [created_date], [updated_date], [deleted_date]) VALUES (113, N'ABC000902419', 114, 15, CAST(100 AS Decimal(18, 0)), 1, CAST(N'2022-03-13' AS Date), CAST(N'2022-03-13T09:09:30.190' AS DateTime), CAST(N'2022-03-13T09:09:30.190' AS DateTime), NULL)
INSERT [dbo].[Orders] ([id], [order_number], [customer_id], [payment_id], [total_amount], [status_order], [date_order], [created_date], [updated_date], [deleted_date]) VALUES (114, N'ABC000902308', 114, 16, CAST(100 AS Decimal(18, 0)), 1, CAST(N'2022-03-13' AS Date), CAST(N'2022-03-13T09:10:33.777' AS DateTime), CAST(N'2022-03-13T09:10:33.777' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Orders] OFF
GO
SET IDENTITY_INSERT [dbo].[Payment] ON 

INSERT [dbo].[Payment] ([id], [user_id], [order_id], [amount], [date_payment], [status], [created_date], [updated_date], [deleted_date]) VALUES (11, 2, N'9YB87580A4156834A', CAST(100 AS Decimal(18, 0)), CAST(N'2022-03-07' AS Date), 1, CAST(N'2022-03-07T23:17:07.013' AS DateTime), CAST(N'2022-03-07T23:17:07.013' AS DateTime), NULL)
INSERT [dbo].[Payment] ([id], [user_id], [order_id], [amount], [date_payment], [status], [created_date], [updated_date], [deleted_date]) VALUES (12, 2, N'7XY428295P219154B', CAST(300 AS Decimal(18, 0)), CAST(N'2022-03-09' AS Date), 1, CAST(N'2022-03-09T18:28:13.400' AS DateTime), CAST(N'2022-03-09T18:28:13.400' AS DateTime), NULL)
INSERT [dbo].[Payment] ([id], [user_id], [order_id], [amount], [date_payment], [status], [created_date], [updated_date], [deleted_date]) VALUES (13, 2, N'4FS95921GP9995817', CAST(100 AS Decimal(18, 0)), CAST(N'2022-03-09' AS Date), 1, CAST(N'2022-03-09T19:17:48.130' AS DateTime), CAST(N'2022-03-09T19:17:48.130' AS DateTime), NULL)
INSERT [dbo].[Payment] ([id], [user_id], [order_id], [amount], [date_payment], [status], [created_date], [updated_date], [deleted_date]) VALUES (14, 113, N'2WA43123UG325292K', CAST(100 AS Decimal(18, 0)), CAST(N'2022-03-13' AS Date), 1, CAST(N'2022-03-13T05:08:49.277' AS DateTime), CAST(N'2022-03-13T05:08:49.277' AS DateTime), NULL)
INSERT [dbo].[Payment] ([id], [user_id], [order_id], [amount], [date_payment], [status], [created_date], [updated_date], [deleted_date]) VALUES (15, 114, N'90800012N8717620R', CAST(100 AS Decimal(18, 0)), CAST(N'2022-03-13' AS Date), 1, CAST(N'2022-03-13T09:09:30.190' AS DateTime), CAST(N'2022-03-13T09:09:30.190' AS DateTime), NULL)
INSERT [dbo].[Payment] ([id], [user_id], [order_id], [amount], [date_payment], [status], [created_date], [updated_date], [deleted_date]) VALUES (16, 114, N'4HJ94770RS7765520', CAST(100 AS Decimal(18, 0)), CAST(N'2022-03-13' AS Date), 1, CAST(N'2022-03-13T09:10:33.777' AS DateTime), CAST(N'2022-03-13T09:10:33.777' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Payment] OFF
GO
SET IDENTITY_INSERT [dbo].[Review] ON 

INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (3, 4.5, N'good job', 2, 2, CAST(N'2022-02-22T21:43:36.013' AS DateTime), CAST(N'2022-02-22T21:53:37.397' AS DateTime), CAST(N'2022-02-22T21:53:37.333' AS DateTime))
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (4, 3.5, N'good job', 2, 2, CAST(N'2022-02-22T22:01:12.293' AS DateTime), CAST(N'2022-02-22T22:01:12.293' AS DateTime), NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (5, 4.5, N'lâm code a\gà', 2, 1, CAST(N'2022-03-02T18:50:59.293' AS DateTime), CAST(N'2022-03-03T09:00:46.467' AS DateTime), CAST(N'2022-03-03T09:00:46.433' AS DateTime))
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (6, 4, N'Good Course', 2, 1, CAST(N'2022-03-03T09:12:49.980' AS DateTime), CAST(N'2022-03-07T23:22:29.333' AS DateTime), CAST(N'2022-03-07T23:22:29.313' AS DateTime))
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (7, 3, N'haha', 2, 1, CAST(N'2022-03-07T23:22:43.710' AS DateTime), CAST(N'2022-03-09T18:58:47.160' AS DateTime), NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (8, 4.5, N'quis orci eget orci vehicula condimentum curabitur in libero ut', 12, 1, CAST(N'2021-06-13T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (9, 4.5, N'mauris eget massa tempor convallis nulla neque libero convallis eget eleifend', 12, 2, CAST(N'2021-05-15T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (10, 4.5, N'eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare', 22, 1, CAST(N'2021-08-06T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (11, 4.5, N'nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede', 32, 1, CAST(N'2021-04-10T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (12, 4, N'quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer', 14, 1, CAST(N'2021-07-06T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (13, 4.5, N'convallis nunc proin at turpis a pede posuere nonummy integer non velit donec', 15, 1, CAST(N'2022-02-27T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (14, 3.5, N'nulla elit ac nulla sed vel enim sit amet nunc', 26, 1, CAST(N'2021-06-11T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (15, 4.5, N'nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum', 27, 2, CAST(N'2021-07-17T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (16, 4.5, N'sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque', 24, 2, CAST(N'2021-08-02T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (17, 3, N'diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed', 23, 2, CAST(N'2021-07-09T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (18, 3, N'velit vivamus vel nulla eget eros elementum pellentesque quisque porta', 45, 3, CAST(N'2021-04-29T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (20, 3, N'volutpat dui maecenas tristique est et tempus semper est quam pharetra magna', 23, 4, CAST(N'2022-01-28T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (21, 3, N'rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl', 23, 4, CAST(N'2021-12-18T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (22, 4, N'pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus', 34, 2, CAST(N'2021-04-07T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (23, 4, N'est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna', 34, 3, CAST(N'2021-12-08T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (24, 4, N'sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae', 34, 4, CAST(N'2021-08-01T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (25, 4, N'libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in', 23, 4, CAST(N'2021-06-30T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (26, 4, N'sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc', 27, 4, CAST(N'2021-05-18T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (27, 4, N'libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan', 28, 3, CAST(N'2021-05-04T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (28, 4, N'vel sem sed sagittis nam congue risus semper porta volutpat quam pede', 29, 4, CAST(N'2021-07-14T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (29, 4, N'interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis', 32, 4, CAST(N'2022-02-23T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (30, 4.5, N'integer a nibh in quis justo maecenas rhoncus aliquam lacus', 37, 4, CAST(N'2021-08-17T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (31, 4.5, N'sed accumsan felis ut at dolor quis odio consequat varius', 35, 3, CAST(N'2021-03-13T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (32, 4.5, N'consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non', 34, 4, CAST(N'2021-10-14T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (33, 4.5, N'eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat', 32, 4, CAST(N'2022-02-13T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (34, 4.5, N'magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere', 35, 4, CAST(N'2021-07-06T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (35, 4.5, N'cursus id turpis integer aliquet massa id lobortis convallis tortor', 32, 4, CAST(N'2021-04-19T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (36, 4.5, N'nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum', 35, 4, CAST(N'2021-07-06T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (37, 4.5, N'nibh ligula nec sem duis aliquam convallis nunc proin at', 25, 3, CAST(N'2021-03-27T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (38, 4.5, N'diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis', 43, 4, CAST(N'2022-01-03T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (39, 4.5, N'vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin', 44, 4, CAST(N'2021-10-01T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (40, 4.5, N'rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus', 45, 4, CAST(N'2021-05-17T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (41, 4.5, N'lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi', 42, 3, CAST(N'2021-12-02T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (42, 4.5, N'mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis', 44, 3, CAST(N'2021-07-21T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (43, 3, N'ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet', 41, 3, CAST(N'2022-01-18T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (44, 4.5, N'turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam', 46, 3, CAST(N'2022-01-21T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (45, 4.5, N'eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est', 46, 4, CAST(N'2022-02-17T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (46, 4.5, N'dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan', 51, 3, CAST(N'2021-06-12T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (47, 3, N'mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet', 51, 4, CAST(N'2021-09-20T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (48, 4.5, N'massa donec dapibus duis at velit eu est congue elementum', 49, 3, CAST(N'2021-11-03T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (49, 4.5, N'maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque', 49, 4, CAST(N'2022-02-01T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (50, 4.5, N'rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia', 49, 2, CAST(N'2021-03-17T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (51, 4.5, N'nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend', 50, 1, CAST(N'2021-10-13T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (52, 4.5, N'turpis adipiscing lorem vitae mattis nibh ligula nec sem duis', 50, 2, CAST(N'2022-01-02T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (53, 4.5, N'ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer', 52, 1, CAST(N'2022-01-29T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (54, 4.5, N'integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non', 47, 3, CAST(N'2021-06-04T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (55, 4.5, N'adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien', 46, 2, CAST(N'2021-09-05T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (56, 4.5, N'in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan', 42, 1, CAST(N'2021-10-22T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (57, 4.5, N'facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit', 37, 3, CAST(N'2021-04-05T00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (59, 3, N'good course', 113, 1, CAST(N'2022-03-13T05:09:32.970' AS DateTime), CAST(N'2022-03-13T05:09:32.970' AS DateTime), NULL)
INSERT [dbo].[Review] ([id], [ratting], [feedback], [customer_id], [course_id], [created_date], [updated_date], [deleted_date]) VALUES (60, 3, N'good course', 114, 1, CAST(N'2022-03-13T09:11:18.160' AS DateTime), CAST(N'2022-03-13T09:11:18.160' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Review] OFF
GO
SET IDENTITY_INSERT [dbo].[SavedCourse] ON 

INSERT [dbo].[SavedCourse] ([id], [course_id], [user_id], [created_date], [updated_date], [deleted_date]) VALUES (5, 10002, 2, CAST(N'2022-03-03T09:12:23.347' AS DateTime), CAST(N'2022-03-07T23:13:46.647' AS DateTime), CAST(N'2022-03-07T23:13:46.637' AS DateTime))
INSERT [dbo].[SavedCourse] ([id], [course_id], [user_id], [created_date], [updated_date], [deleted_date]) VALUES (6, 2, 2, CAST(N'2022-03-03T09:12:30.150' AS DateTime), CAST(N'2022-03-07T23:13:47.267' AS DateTime), CAST(N'2022-03-07T23:13:47.267' AS DateTime))
INSERT [dbo].[SavedCourse] ([id], [course_id], [user_id], [created_date], [updated_date], [deleted_date]) VALUES (16, 1, 2, CAST(N'2022-03-03T11:12:11.587' AS DateTime), CAST(N'2022-03-07T23:13:47.483' AS DateTime), CAST(N'2022-03-07T23:13:47.483' AS DateTime))
INSERT [dbo].[SavedCourse] ([id], [course_id], [user_id], [created_date], [updated_date], [deleted_date]) VALUES (17, 1, 2, CAST(N'2022-03-07T23:13:57.087' AS DateTime), CAST(N'2022-03-07T23:13:59.420' AS DateTime), CAST(N'2022-03-07T23:13:59.420' AS DateTime))
INSERT [dbo].[SavedCourse] ([id], [course_id], [user_id], [created_date], [updated_date], [deleted_date]) VALUES (18, 1, 2, CAST(N'2022-03-08T21:02:05.057' AS DateTime), CAST(N'2022-03-08T21:02:13.800' AS DateTime), CAST(N'2022-03-08T21:02:13.793' AS DateTime))
INSERT [dbo].[SavedCourse] ([id], [course_id], [user_id], [created_date], [updated_date], [deleted_date]) VALUES (19, 2, 2, CAST(N'2022-03-08T21:02:08.113' AS DateTime), CAST(N'2022-03-08T21:02:15.417' AS DateTime), CAST(N'2022-03-08T21:02:15.413' AS DateTime))
INSERT [dbo].[SavedCourse] ([id], [course_id], [user_id], [created_date], [updated_date], [deleted_date]) VALUES (20, 10002, 2, CAST(N'2022-03-08T21:02:11.537' AS DateTime), CAST(N'2022-03-08T21:02:23.877' AS DateTime), CAST(N'2022-03-08T21:02:23.877' AS DateTime))
INSERT [dbo].[SavedCourse] ([id], [course_id], [user_id], [created_date], [updated_date], [deleted_date]) VALUES (21, 5, 2, CAST(N'2022-03-08T21:02:20.313' AS DateTime), CAST(N'2022-03-08T21:02:24.207' AS DateTime), CAST(N'2022-03-08T21:02:24.207' AS DateTime))
INSERT [dbo].[SavedCourse] ([id], [course_id], [user_id], [created_date], [updated_date], [deleted_date]) VALUES (22, 10003, 2, CAST(N'2022-03-09T18:26:57.670' AS DateTime), CAST(N'2022-03-09T18:26:58.593' AS DateTime), CAST(N'2022-03-09T18:26:58.593' AS DateTime))
INSERT [dbo].[SavedCourse] ([id], [course_id], [user_id], [created_date], [updated_date], [deleted_date]) VALUES (23, 10003, 2, CAST(N'2022-03-09T18:26:59.243' AS DateTime), CAST(N'2022-03-09T18:26:59.797' AS DateTime), CAST(N'2022-03-09T18:26:59.797' AS DateTime))
INSERT [dbo].[SavedCourse] ([id], [course_id], [user_id], [created_date], [updated_date], [deleted_date]) VALUES (26, 1, 113, CAST(N'2022-03-13T05:07:47.237' AS DateTime), CAST(N'2022-03-13T05:07:47.237' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[SavedCourse] OFF
GO
SET IDENTITY_INSERT [dbo].[SubCatalog] ON 

INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (1, 1, N'Web Development', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (2, 1, N'Data Science', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (3, 1, N'Mobile Development', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (4, 1, N'Game Development', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (5, 1, N'Database Design & Development', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (6, 2, N'Web Design', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (7, 2, N'Graphic Design & Illustration', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (8, 2, N'Game Design', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (9, 2, N'3D & Animation', NULL, CAST(N'2022-01-21T22:09:02.037' AS DateTime), CAST(N'2022-01-21T22:11:36.780' AS DateTime), NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (10, 2, N'Other Design', NULL, CAST(N'2022-01-21T22:11:26.727' AS DateTime), CAST(N'2022-02-07T19:49:23.207' AS DateTime), NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (11, 3, N'Entrepreneurship', NULL, CAST(N'2022-01-21T22:13:21.740' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (12, 3, N'Communication', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (13, 3, N'Sales', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (14, 3, N'Business Strategy', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (15, 3, N'E-Commerce', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (16, 4, N'Digital Marketing', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (17, 4, N'Branding', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (18, 4, N'Marketing Fundamentals', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (19, 4, N'Paid Advertising', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (20, 4, N'Other Marketing', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (21, 5, N'Accounting & Bokkkeeping', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (22, 5, N'Compliance', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (23, 5, N'Taxes', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (24, 5, N'Economics', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (25, 5, N'Other Finace & Accounting', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (31, 10, N'Leadership', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (32, 10, N'Creativity', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (33, 10, N'Motivation', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (34, 10, N'Influence', NULL, CAST(N'2022-01-21T22:08:21.787' AS DateTime), NULL, NULL)
INSERT [dbo].[SubCatalog] ([id], [catalog_id], [name], [description], [created_date], [updated_date], [deleted_date]) VALUES (38, 12, N'Art & Crafts', N'Art & Crafts', CAST(N'2022-03-13T05:11:43.813' AS DateTime), CAST(N'2022-03-13T05:11:43.813' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[SubCatalog] OFF
GO
ALTER TABLE [dbo].[AppUser]  WITH CHECK ADD  CONSTRAINT [FK_AppUser_AppRole] FOREIGN KEY([role_id])
REFERENCES [dbo].[AppRole] ([id])
GO
ALTER TABLE [dbo].[AppUser] CHECK CONSTRAINT [FK_AppUser_AppRole]
GO
ALTER TABLE [dbo].[Conversation]  WITH CHECK ADD  CONSTRAINT [FK_Messages_AppUser] FOREIGN KEY([user_id_one])
REFERENCES [dbo].[AppUser] ([id])
GO
ALTER TABLE [dbo].[Conversation] CHECK CONSTRAINT [FK_Messages_AppUser]
GO
ALTER TABLE [dbo].[Conversation]  WITH CHECK ADD  CONSTRAINT [FK_Messages_AppUser1] FOREIGN KEY([user_id_two])
REFERENCES [dbo].[AppUser] ([id])
GO
ALTER TABLE [dbo].[Conversation] CHECK CONSTRAINT [FK_Messages_AppUser1]
GO
ALTER TABLE [dbo].[Course]  WITH CHECK ADD  CONSTRAINT [FK_Course_SubCatalog] FOREIGN KEY([subcatalog_id])
REFERENCES [dbo].[SubCatalog] ([id])
GO
ALTER TABLE [dbo].[Course] CHECK CONSTRAINT [FK_Course_SubCatalog]
GO
ALTER TABLE [dbo].[Feedback]  WITH CHECK ADD  CONSTRAINT [FK_Feedback_AppUser] FOREIGN KEY([customer_id])
REFERENCES [dbo].[AppUser] ([id])
GO
ALTER TABLE [dbo].[Feedback] CHECK CONSTRAINT [FK_Feedback_AppUser]
GO
ALTER TABLE [dbo].[Feedback]  WITH CHECK ADD  CONSTRAINT [FK_Feedback_Course] FOREIGN KEY([course_id])
REFERENCES [dbo].[Course] ([id])
GO
ALTER TABLE [dbo].[Feedback] CHECK CONSTRAINT [FK_Feedback_Course]
GO
ALTER TABLE [dbo].[Lecture]  WITH CHECK ADD  CONSTRAINT [FK_ContentLesson_Lesson] FOREIGN KEY([lesson_id])
REFERENCES [dbo].[Lesson] ([id])
GO
ALTER TABLE [dbo].[Lecture] CHECK CONSTRAINT [FK_ContentLesson_Lesson]
GO
ALTER TABLE [dbo].[Lesson]  WITH CHECK ADD  CONSTRAINT [FK_Lesson_Course] FOREIGN KEY([course_id])
REFERENCES [dbo].[Course] ([id])
GO
ALTER TABLE [dbo].[Lesson] CHECK CONSTRAINT [FK_Lesson_Course]
GO
ALTER TABLE [dbo].[Messages]  WITH CHECK ADD  CONSTRAINT [FK_Messages_AppUser2] FOREIGN KEY([user_id])
REFERENCES [dbo].[AppUser] ([id])
GO
ALTER TABLE [dbo].[Messages] CHECK CONSTRAINT [FK_Messages_AppUser2]
GO
ALTER TABLE [dbo].[Messages]  WITH CHECK ADD  CONSTRAINT [FK_Messages_Conversation] FOREIGN KEY([conversation_id])
REFERENCES [dbo].[Conversation] ([id])
GO
ALTER TABLE [dbo].[Messages] CHECK CONSTRAINT [FK_Messages_Conversation]
GO
ALTER TABLE [dbo].[OrderDetail]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetail_Course] FOREIGN KEY([course_id])
REFERENCES [dbo].[Course] ([id])
GO
ALTER TABLE [dbo].[OrderDetail] CHECK CONSTRAINT [FK_OrderDetail_Course]
GO
ALTER TABLE [dbo].[OrderDetail]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetail_Orders] FOREIGN KEY([order_id])
REFERENCES [dbo].[Orders] ([id])
GO
ALTER TABLE [dbo].[OrderDetail] CHECK CONSTRAINT [FK_OrderDetail_Orders]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_AppUser] FOREIGN KEY([customer_id])
REFERENCES [dbo].[AppUser] ([id])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_AppUser]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Payment] FOREIGN KEY([payment_id])
REFERENCES [dbo].[Payment] ([id])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Payment]
GO
ALTER TABLE [dbo].[Payment]  WITH CHECK ADD  CONSTRAINT [FK_Payment_AppUser] FOREIGN KEY([user_id])
REFERENCES [dbo].[AppUser] ([id])
GO
ALTER TABLE [dbo].[Payment] CHECK CONSTRAINT [FK_Payment_AppUser]
GO
ALTER TABLE [dbo].[Review]  WITH CHECK ADD  CONSTRAINT [FK_Review_AppUser] FOREIGN KEY([customer_id])
REFERENCES [dbo].[AppUser] ([id])
GO
ALTER TABLE [dbo].[Review] CHECK CONSTRAINT [FK_Review_AppUser]
GO
ALTER TABLE [dbo].[Review]  WITH CHECK ADD  CONSTRAINT [FK_Review_Course] FOREIGN KEY([course_id])
REFERENCES [dbo].[Course] ([id])
GO
ALTER TABLE [dbo].[Review] CHECK CONSTRAINT [FK_Review_Course]
GO
ALTER TABLE [dbo].[SavedCourse]  WITH CHECK ADD  CONSTRAINT [FK_SavedCourse_AppUser] FOREIGN KEY([user_id])
REFERENCES [dbo].[AppUser] ([id])
GO
ALTER TABLE [dbo].[SavedCourse] CHECK CONSTRAINT [FK_SavedCourse_AppUser]
GO
ALTER TABLE [dbo].[SavedCourse]  WITH CHECK ADD  CONSTRAINT [FK_SavedCourse_Course] FOREIGN KEY([course_id])
REFERENCES [dbo].[Course] ([id])
GO
ALTER TABLE [dbo].[SavedCourse] CHECK CONSTRAINT [FK_SavedCourse_Course]
GO
ALTER TABLE [dbo].[SubCatalog]  WITH CHECK ADD  CONSTRAINT [FK_SubCatalog_Catalog] FOREIGN KEY([catalog_id])
REFERENCES [dbo].[Catalog] ([id])
GO
ALTER TABLE [dbo].[SubCatalog] CHECK CONSTRAINT [FK_SubCatalog_Catalog]
GO
USE [master]
GO
ALTER DATABASE [EduOnline] SET  READ_WRITE 
GO
